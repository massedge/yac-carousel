import { ComposeConstructor } from '../../types'

import {
  MixinBase,
  MixinClass,
  MixinInstance,
  MixinOptions,
  MixinEventMap,
} from './types'

export default function FocusableMixin<T extends new (o: any) => MixinBase>(
  Base: T
) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #focused: boolean = false

    get focused() {
      return this.#focused
    }

    on<K extends keyof MixinEventMap>(
      type: K,
      listener: (ev: MixinEventMap[K]) => void
    ) {
      return this.emitter.on.call(this, type, listener)
    }

    off<K extends keyof MixinEventMap>(
      type: K,
      listener: (ev: MixinEventMap[K]) => void
    ) {
      return this.emitter.off.call(this, type, listener)
    }

    focus() {
      if (this.#focused) return true

      const e: MixinEventMap['yac:focus'] = new CustomEvent('yac:focus', {
        cancelable: true,
        bubbles: false,
      })
      this.emitter.emit(e)

      if (e.defaultPrevented) return false
      this.#focused = true

      const eChanged: MixinEventMap['yac:focus:changed'] = new CustomEvent(
        'yac:focus:changed',
        {
          bubbles: false,
          detail: {
            focused: this.#focused,
          },
        }
      )
      this.emitter.emit(eChanged)

      return true
    }

    blur() {
      if (!this.#focused) return false

      const e: MixinEventMap['yac:blur'] = new CustomEvent('yac:blur', {
        cancelable: true,
        bubbles: false,
      })
      this.emitter.emit(e)

      if (e.defaultPrevented) return false
      this.#focused = false

      const eChanged: MixinEventMap['yac:focus:changed'] = new CustomEvent(
        'yac:focus:changed',
        {
          bubbles: false,
          detail: {
            focused: this.#focused,
          },
        }
      )
      this.emitter.emit(eChanged)

      return true
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
