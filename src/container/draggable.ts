import { ComposeConstructor } from "../helpers/.types"

export interface DraggableOptions {
  preventDragging?: (e: Event) => boolean
}

export interface Draggable {
  new(options?: DraggableOptions): DraggableInstance
  draggable: boolean
}

export interface DraggableInstance {
}

export default function Draggable<T extends new (o: any) => any>(Base: T) {
  // ensure draggable is not mixed in more than once
  if ((Base as any).draggable) return Base as ComposeConstructor<Draggable, typeof Base>

  class Mixin extends (Base as new (...a: any[]) => {}) implements DraggableInstance {
      static draggable = true

      private _dragging: boolean = false

      // protected
      protected set dragging(value) {
        this._dragging = value;
      }

      protected get dragging() {
        return this._dragging;
      }
  }
  
  return <unknown>Mixin as ComposeConstructor<Draggable, typeof Base>
}
