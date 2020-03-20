import { ComposeConstructor } from "../../types"

export interface CoreDraggableOptions {
  preventDragging?: (e: Event, prevented: boolean) => boolean
}

export interface CoreDraggable {
  new(options?: CoreDraggableOptions): CoreDraggableInstance
}

export interface CoreDraggableInstance {
  _dragging: boolean
  preventDraggingOverride: NonNullable<CoreDraggableOptions['preventDragging']>
}

export default function CoreDraggable<T extends new (o: any) => any>(Base: T) {
  class Mixin extends (Base as new (...a: any[]) => {}) implements CoreDraggableInstance {
      #dragging: boolean = false
      preventDraggingOverride: NonNullable<CoreDraggableOptions['preventDragging']>

      constructor({
        preventDragging = () => false,
        ...otherOptions
      }: CoreDraggableOptions) {
        super({preventDragging, ...otherOptions})
        this.preventDraggingOverride = preventDragging
      }

      // protected
      set _dragging(value) {
        this.#dragging = value;
      }

      get _dragging() {
        return this.#dragging;
      }
  }
  
  return Mixin as unknown as ComposeConstructor<CoreDraggable, typeof Base>
}
