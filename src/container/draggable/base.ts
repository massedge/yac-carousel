import { ComposeConstructor } from "../../types"

export interface BaseDraggableOptions {
  preventDragging?: (e: Event, prevented: boolean) => boolean
}

export interface BaseDraggable {
  new(options?: BaseDraggableOptions): BaseDraggableInstance
  readonly draggable: true
}

export interface BaseDraggableInstance {
}

export default function BaseDraggable<T extends new (o: any) => any>(Base: T) {
  class Mixin extends (Base as new (...a: any[]) => {}) implements BaseDraggableInstance {
      static readonly draggable = true

      private _dragging: boolean = false
      protected readonly preventDraggingOverride: Required<BaseDraggableOptions['preventDragging']>

      constructor({
        preventDragging = () => false,
        ...otherOptions
      }: BaseDraggableOptions) {
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
  
  return Mixin as unknown as ComposeConstructor<BaseDraggable, typeof Base>
}
