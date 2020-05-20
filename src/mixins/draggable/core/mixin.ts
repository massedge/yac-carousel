import { ComposeConstructor } from '../../../types'

import {
  DraggableCoreMixinBase,
  DraggableCoreMixinClass,
  DraggableCoreMixinEventMap,
  DraggableCoreMixinInstance,
  DraggableCoreMixinOptions,
} from './types'

export default function DraggableCoreMixin<
  T extends new (o: any) => DraggableCoreMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: DraggableCoreMixinOptions
    ) => DraggableCoreMixinBase)
    implements DraggableCoreMixinInstance {
    #dragging: boolean = false

    // protected
    set _dragging(value) {
      this.#dragging = value
    }

    get _dragging() {
      return this.#dragging
    }

    on<K extends keyof DraggableCoreMixinEventMap>(
      type: K,
      listener: (ev: DraggableCoreMixinEventMap[K]) => void
    ) {
      return this.emitter.on.call(this, type, listener)
    }

    off<K extends keyof DraggableCoreMixinEventMap>(
      type: K,
      listener: (ev: DraggableCoreMixinEventMap[K]) => void
    ) {
      return this.emitter.off.call(this, type, listener)
    }

    _preventDragging(originalEvent: UIEvent): boolean {
      const ev: DraggableCoreMixinEventMap['yac:dragging:start'] = new CustomEvent(
        'yac:dragging:start',
        {
          cancelable: true,
          bubbles: false,
          detail: {
            originalEvent,
          },
        }
      )
      this.emitter.emit(ev)

      return ev.defaultPrevented
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    DraggableCoreMixinClass,
    typeof Base
  >
}
