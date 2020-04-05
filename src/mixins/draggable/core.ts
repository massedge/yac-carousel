import { ComposeConstructor } from '../../types'
import { DraggingStartEventDetail, DRAGGING_START_EVENT } from './types'
import { MixinInstance as ElementEventableInstance } from '../eventable/element/types'

export interface DraggableCoreOptions {}

export interface DraggableCore {
  new (options?: DraggableCoreOptions): DraggableCoreInstance
}

export interface DraggableCoreInstance {
  _dragging: boolean
  _preventDragging(e: MouseEvent | PointerEvent | TouchEvent): boolean
}

export interface DraggableCoreBase
  extends Pick<ElementEventableInstance, '_emit'> {}

export default function DraggableCore<
  T extends new (o: any) => DraggableCoreBase
>(Base: T) {
  class Mixin
    extends (Base as new (options: DraggableCoreOptions) => DraggableCoreBase)
    implements DraggableCoreInstance {
    #dragging: boolean = false

    // protected
    set _dragging(value) {
      this.#dragging = value
    }

    get _dragging() {
      return this.#dragging
    }

    _preventDragging(
      originalEvent: MouseEvent | PointerEvent | TouchEvent
    ): boolean {
      const ev = new CustomEvent<DraggingStartEventDetail>(
        DRAGGING_START_EVENT,
        {
          cancelable: true,
          detail: {
            originalEvent,
          },
        }
      )
      this._emit(ev)

      return ev.defaultPrevented
    }
  }

  return (Mixin as unknown) as ComposeConstructor<DraggableCore, typeof Base>
}
