import { ComposeConstructor } from '../../types'
import {
  DraggableEventMap,
  DraggingStartEventDetail,
  DRAGGING_START_EVENT,
} from './types'
import { MixinInstance as EventableInstance } from '../eventable/types'

export interface DraggableCoreOptions {}

export interface DraggableCore {
  new (options?: DraggableCoreOptions): DraggableCoreInstance
}

export interface DraggableCoreInstance {
  _dragging: boolean
  _preventDragging(e: MouseEvent | PointerEvent | TouchEvent): boolean
  on: (
    type: typeof DRAGGING_START_EVENT,
    listener: (ev: DraggableEventMap[typeof DRAGGING_START_EVENT]) => void
  ) => void
  off: (
    type: typeof DRAGGING_START_EVENT,
    listener: (ev: DraggableEventMap[typeof DRAGGING_START_EVENT]) => void
  ) => void
}

export interface DraggableCoreBase extends Pick<EventableInstance, 'emitter'> {}

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

    on<K extends keyof DraggableEventMap>(
      type: K,
      listener: (ev: DraggableEventMap[K]) => void
    ) {
      return this.emitter.on.call(this, type, listener)
    }

    off<K extends keyof DraggableEventMap>(
      type: K,
      listener: (ev: DraggableEventMap[K]) => void
    ) {
      return this.emitter.off.call(this, type, listener)
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
      this.emitter.emit(ev)

      return ev.defaultPrevented
    }
  }

  return (Mixin as unknown) as ComposeConstructor<DraggableCore, typeof Base>
}
