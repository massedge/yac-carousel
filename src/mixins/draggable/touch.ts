import { ComposeConstructor } from '../../types'
import { MixinInstance as NudgeableInstance } from '../nudgeable/types'
import { ElementableInstance } from '../elementable/core'
import { DraggableCoreInstance } from './core'
import Nudge from '../../classes/nudge'

export interface DraggableTouchOptions {}

export interface DraggableTouch {
  new (options: DraggableTouchOptions): DraggableTouchInstance
}

export interface DraggableTouchInstance {
  render: () => void
  destroy: () => void
}

export interface DraggableTouchBase
  extends Pick<ElementableInstance, 'element'>,
    Pick<NudgeableInstance, 'nudge' | 'settle'>,
    Pick<DraggableCoreInstance, '_dragging' | '_preventDragging'> {
  render(): void
  destroy(): void
}

export default function DraggableTouch<
  T extends new (o: any) => DraggableTouchBase
>(Base: T) {
  class Mixin
    extends (Base as new (options: DraggableTouchOptions) => DraggableTouchBase)
    implements DraggableTouchInstance {
    #touchStartFn: (e: TouchEvent) => void
    #touchMoveFn: (e: TouchEvent) => void
    #touchEndFn: (e: TouchEvent) => void
    #touchLastCoordinate: { x: number; y: number } = { x: 0, y: 0 }

    constructor(options: DraggableTouchOptions) {
      super(options)

      this.#touchStartFn = this.touchStart.bind(this)
      this.#touchMoveFn = this.touchMove.bind(this)
      this.#touchEndFn = this.touchEnd.bind(this)
    }

    render() {
      super.render()

      this.element.addEventListener('touchstart', this.#touchStartFn)
    }

    private touchStart(e: TouchEvent) {
      if (this._dragging) {
        return
      }
      if (this._preventDragging(e)) {
        return
      }

      this._dragging = true

      this.#touchLastCoordinate = this.getTouchEventCoordinate(e)

      this.attachTouchFns()

      this.nudge({
        nudge: new Nudge(),
        settled: false,
      })

      // SAFARI - prevent scrolling the screen while dragging is active
      e.preventDefault()
    }

    private touchMove(e: TouchEvent) {
      const coordinate = this.getTouchEventCoordinate(e)

      this.nudge({
        nudge: new Nudge({
          x: coordinate.x - this.#touchLastCoordinate.x,
          y: coordinate.y - this.#touchLastCoordinate.y,
        }),
        settled: false,
      })

      this.#touchLastCoordinate = coordinate
    }

    private touchEnd(e: TouchEvent) {
      this.detachTouchFns()

      this.settle()

      this._dragging = false
    }

    private getTouchEventCoordinate(e: TouchEvent) {
      const touch = e.touches[0]
      return {
        x: touch.clientX,
        y: touch.clientY,
      }
    }

    destroy() {
      this.element.removeEventListener('touchstart', this.#touchStartFn)
      this.detachTouchFns()
      super.destroy()
    }

    private attachTouchFns() {
      this.element.ownerDocument?.addEventListener(
        'touchmove',
        this.#touchMoveFn
      )
      this.element.ownerDocument?.addEventListener('touchend', this.#touchEndFn)
      this.element.ownerDocument?.addEventListener(
        'touchcancel',
        this.#touchEndFn
      )
    }

    private detachTouchFns() {
      this.element.ownerDocument?.removeEventListener(
        'touchmove',
        this.#touchMoveFn
      )
      this.element.ownerDocument?.removeEventListener(
        'touchend',
        this.#touchEndFn
      )
      this.element.ownerDocument?.removeEventListener(
        'touchcancel',
        this.#touchEndFn
      )
    }
  }

  return (Mixin as unknown) as ComposeConstructor<DraggableTouch, typeof Base>
}
