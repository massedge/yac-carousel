import { ComposeConstructor } from '../../../types'
import Direction from '../../../enums/direction'
import { NudgeableInstance } from '../nudgeable'
import { ElementableInstance } from '../../elementable'
import { DraggableCoreInstance } from './core'
import { DirectionableInstance } from '../../directionable'

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
    Pick<DirectionableInstance, 'direction'>,
    Pick<NudgeableInstance, 'nudge' | 'settle'>,
    Pick<DraggableCoreInstance, '_dragging' | 'preventDraggingOverride'> {
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
    #touchLastCoordinate: number = 0

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

    private preventDragging(e: TouchEvent) {
      let prevented: boolean = false

      prevented = this.preventDraggingOverride(e, prevented)

      return prevented
    }

    private touchStart(e: TouchEvent) {
      if (this._dragging) {
        return
      }
      if (this.preventDragging(e)) {
        return
      }

      this._dragging = true

      this.#touchLastCoordinate = this.getTouchEventCoordinate(e)

      this.attachTouchFns()

      this.nudge(0)

      // SAFARI - prevent scrolling the screen while dragging is active
      e.preventDefault()
    }

    private touchMove(e: TouchEvent) {
      const coordinate = this.getTouchEventCoordinate(e)
      const difference = coordinate - this.#touchLastCoordinate

      this.nudge(difference)

      this.#touchLastCoordinate = coordinate
    }

    private touchEnd(e: TouchEvent) {
      this.detachTouchFns()

      this.settle()

      this._dragging = false
    }

    private getTouchEventCoordinate(e: TouchEvent) {
      const touch = e.touches[0]
      return this.direction === Direction.HORIZONTAL
        ? touch.clientX
        : touch.clientY
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
