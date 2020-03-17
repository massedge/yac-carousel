import { ComposeConstructor } from "../../types"

export interface DraggableOptions {
  preventDragging?: (e: Event, prevented: boolean) => boolean
}

export interface Draggable {
  new(options?: DraggableOptions): DraggableInstance
  draggable: boolean
}

export interface DraggableInstance {
}

export default function Draggable<T extends new (o: any) => any>(Base: T) {
  class Mixin extends (Base as new (...a: any[]) => {}) implements DraggableInstance {
      static readonly draggable = true

      private _dragging: boolean = false
      protected readonly preventDraggingOverride: Required<DraggableOptions['preventDragging']>

      constructor({
        preventDragging = () => false,
        ...otherOptions
      }: DraggableOptions) {
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
  
  return Mixin as unknown as ComposeConstructor<Draggable, typeof Base>
}
