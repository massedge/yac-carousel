import { ComposeConstructor } from '../../../types'
import Direction from '../../../enums/direction'
import { MixinInstance as NudgeableInstance } from '../nudgeable/types'
import { ElementableInstance } from '../../elementable'
import { DraggableCoreInstance } from './core'
import { DirectionableInstance } from '../../directionable'
import Nudge from '../../../classes/nudge'

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
    Pick<DirectionableInstance, 'direction'>,
    Pick<NudgeableInstance, 'nudge' | 'settle'>,
    Pick<DraggableCoreInstance, '_dragging' | '_preventDragging'> {
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
    #mouseLastCoordinate: number = 0

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

      this.nudge()
    }

    private mouseMove(e: MouseEvent) {
      const coordinate = this.getMouseEventCoordinate(e)
      const difference = coordinate - this.#mouseLastCoordinate

      this.nudge(
        new Nudge({
          x: this.direction === Direction.HORIZONTAL ? difference : 0,
          y: this.direction === Direction.VERTICAL ? difference : 0,
        })
      )

      this.#mouseLastCoordinate = coordinate
    }

    private mouseUp(e: MouseEvent | DragEvent) {
      this.detachMouseFns()

      this.settle()

      this._dragging = false
    }

    private getMouseEventCoordinate(e: MouseEvent) {
      return this.direction === Direction.HORIZONTAL ? e.clientX : e.clientY
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
