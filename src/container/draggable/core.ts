import { ComposeConstructor } from '../../types'

export interface DraggableCoreOptions {
  preventDragging?: (e: Event, prevented: boolean) => boolean
}

export interface DraggableCore {
  new (options?: DraggableCoreOptions): DraggableCoreInstance
}

export interface DraggableCoreInstance {
  _dragging: boolean
  preventDraggingOverride: NonNullable<DraggableCoreOptions['preventDragging']>
}

export default function DraggableCore<T extends new (o: any) => any>(Base: T) {
  class Mixin extends (Base as new (...a: any[]) => {})
    implements DraggableCoreInstance {
    #dragging: boolean = false
    preventDraggingOverride: NonNullable<
      DraggableCoreOptions['preventDragging']
    >

    constructor({
      preventDragging = () => false,
      ...otherOptions
    }: DraggableCoreOptions) {
      super({ preventDragging, ...otherOptions })
      this.preventDraggingOverride = preventDragging
    }

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
