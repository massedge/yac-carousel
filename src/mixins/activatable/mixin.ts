import { ComposeConstructor } from '../../types'

import {
  ActivatableMixinBase,
  ActivatableMixinClass,
  ActivatableMixinEventMap,
  ActivatableMixinInstance,
  ActivatableMixinOptions,
} from './types'

export default function ActivatableMixin<
  T extends new (o: any) => ActivatableMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: ActivatableMixinOptions
    ) => ActivatableMixinBase)
    implements ActivatableMixinInstance {
    #active: boolean = false

    get active() {
      return this.#active
    }

    set active(value: boolean) {
      this.#active = value

      // trigger event
      const event: ActivatableMixinEventMap['yac:active'] = new CustomEvent(
        'yac:active',
        {
          detail: {
            active: this.#active,
          },
        }
      )
      this.emitter.emit(event)
    }

    on<K extends keyof ActivatableMixinEventMap>(
      type: K,
      listener: (ev: ActivatableMixinEventMap[K]) => void
    ) {
      return this.emitter.on.call(this, type, listener)
    }

    off<K extends keyof ActivatableMixinEventMap>(
      type: K,
      listener: (ev: ActivatableMixinEventMap[K]) => void
    ) {
      return this.emitter.off.call(this, type, listener)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    ActivatableMixinClass,
    typeof Base
  >
}
