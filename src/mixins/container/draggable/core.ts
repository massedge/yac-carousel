import { ComposeConstructor } from '../../../types'

export interface DraggableCoreOptions {}

export interface DraggableCore {
  new (options?: DraggableCoreOptions): DraggableCoreInstance
}

export interface DraggableCoreInstance {
  _dragging: boolean
}

export default function DraggableCore<T extends new (o: any) => any>(Base: T) {
  class Mixin extends (Base as new (...a: any[]) => {})
    implements DraggableCoreInstance {
    #dragging: boolean = false

    // protected
    set _dragging(value) {
      this.#dragging = value
    }

    get _dragging() {
      return this.#dragging
    }
  }

  return (Mixin as unknown) as ComposeConstructor<DraggableCore, typeof Base>
}
