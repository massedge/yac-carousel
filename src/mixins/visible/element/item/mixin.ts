import { ComposeConstructor } from '../../../../types'

import {
  VisibleItemElementMixinBase,
  VisibleItemElementMixinClass,
  VisibleItemElementMixinEventMap,
  VisibleItemElementMixinInstance,
  VisibleItemElementMixinOptions,
} from './types'

export default function VisibleItemElementMixin<
  T extends new (o: any) => VisibleItemElementMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: VisibleItemElementMixinOptions
    ) => VisibleItemElementMixinBase)
    implements VisibleItemElementMixinInstance {
    #visible: boolean = false

    get visible() {
      return this.#visible
    }

    set visible(value: boolean) {
      this.#visible = value

      // trigger event
      const event: VisibleItemElementMixinEventMap['yac:item:visible'] = new CustomEvent(
        'yac:item:visible',
        {
          detail: {
            visible: this.#visible,
          },
        }
      )
      this.emitter.emit(event)
    }

    on<K extends keyof VisibleItemElementMixinEventMap>(
      type: K,
      listener: (ev: VisibleItemElementMixinEventMap[K]) => void
    ) {
      return this.emitter.on.call(this, type, listener)
    }

    off<K extends keyof VisibleItemElementMixinEventMap>(
      type: K,
      listener: (ev: VisibleItemElementMixinEventMap[K]) => void
    ) {
      return this.emitter.off.call(this, type, listener)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    VisibleItemElementMixinClass,
    typeof Base
  >
}
