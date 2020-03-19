import { ComposeConstructor } from "../../types"

export interface CoreDraggableOptions {
  preventDragging?: (e: Event, prevented: boolean) => boolean
}

export interface CoreDraggable {
  new(options?: CoreDraggableOptions): CoreDraggableInstance
  readonly draggable: true
}

export interface CoreDraggableInstance {
}

export default function CoreDraggable<T extends new (o: any) => any>(Base: T) {
  class Mixin extends (Base as new (...a: any[]) => {}) implements CoreDraggableInstance {
      static readonly draggable = true

      private _dragging: boolean = false
      protected readonly preventDraggingOverride: Required<CoreDraggableOptions['preventDragging']>

      constructor({
        preventDragging = () => false,
        ...otherOptions
      }: CoreDraggableOptions) {
        super({preventDragging, ...otherOptions})
        this.preventDraggingOverride = preventDragging
      }

      // protected
      protected set dragging(value) {
        this._dragging = value;
      }

      protected get dragging() {
        return this._dragging;
      }
  }
  
  return Mixin as unknown as ComposeConstructor<CoreDraggable, typeof Base>
}
