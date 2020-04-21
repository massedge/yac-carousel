import { ComposeConstructor } from '../../types'
import { NudgeableMixinInstance } from '../nudgeable'
import { ElementableInstance } from '../elementable/core'
import { DraggableCoreMixinInstance } from './core'
import Nudge from '../../classes/nudge'

export interface DraggableMouseOptions {}

export interface DraggableMouse {
  new (options: DraggableMouseOptions): DraggableMouseInstance
}

export interface DraggableMouseInstance {
  render: () => void
  destroy: () => void
}

export interface DraggableMouseBase
  extends Pick<ElementableInstance, 'element'>,
    Pick<NudgeableMixinInstance, 'nudge' | 'settle'>,
    Pick<DraggableCoreMixinInstance, '_dragging' | '_preventDragging'> {
  render(): void
  destroy(): void
}

export default function DraggableMouse<
  T extends new (o: any) => DraggableMouseBase
>(Base: T) {
  class Mixin
    extends (Base as new (options: DraggableMouseOptions) => DraggableMouseBase)
    implements DraggableMouseInstance {
    #mouseDownFn: (e: MouseEvent) => void
    #mouseMoveFn: (e: MouseEvent) => void
    #mouseUpFn: (e: MouseEvent) => void
    #mouseLastCoordinate: { x: number; y: number } = { x: 0, y: 0 }

    constructor(options: DraggableMouseOptions) {
      super(options)

      this.#mouseDownFn = this.mouseDown.bind(this)
      this.#mouseMoveFn = this.mouseMove.bind(this)
      this.#mouseUpFn = this.mouseUp.bind(this)
    }

    render() {
      super.render()

      this.element.addEventListener('mousedown', this.#mouseDownFn)
    }

    private mouseDown(e: MouseEvent) {
      if (this._dragging) {
        return
      }
      if (this._preventDragging(e)) {
        return
      }

      this._dragging = true

      this.#mouseLastCoordinate = this.getMouseEventCoordinate(e)

      this.attachMouseFns()

      this.nudge({
        nudge: new Nudge(),
        settled: false,
      })
    }

    private mouseMove(e: MouseEvent) {
      const coordinate = this.getMouseEventCoordinate(e)

      this.nudge({
        nudge: new Nudge({
          x: coordinate.x - this.#mouseLastCoordinate.x,
          y: coordinate.y - this.#mouseLastCoordinate.y,
        }),
        settled: false,
      })

      this.#mouseLastCoordinate = coordinate
    }

    private mouseUp(e: MouseEvent | DragEvent) {
      this.detachMouseFns()

      this.settle()

      this._dragging = false
    }

    private getMouseEventCoordinate(e: MouseEvent) {
      return {
        x: e.clientX,
        y: e.clientY,
      }
    }

    destroy() {
      this.element.removeEventListener('mousedown', this.#mouseDownFn)
      this.detachMouseFns()
      super.destroy()
    }

    private attachMouseFns() {
      this.element.ownerDocument?.addEventListener(
        'mousemove',
        this.#mouseMoveFn
      )
      this.element.ownerDocument?.addEventListener('mouseup', this.#mouseUpFn)
    }

    private detachMouseFns() {
      this.element.ownerDocument?.removeEventListener(
        'mousemove',
        this.#mouseMoveFn
      )
      this.element.ownerDocument?.removeEventListener(
        'mouseup',
        this.#mouseUpFn
      )
    }
  }

  return (Mixin as unknown) as ComposeConstructor<DraggableMouse, typeof Base>
}
