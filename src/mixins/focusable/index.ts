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

    focus() {
      if (this.#focused) return true

      const e: MixinEventMap['yac:focus'] = new CustomEvent('yac:focus', {
        cancelable: true,
      })
      this._emit(e)

      if (e.defaultPrevented) return false
      this.#focused = true

      const eChanged: MixinEventMap['yac:focus:changed'] = new CustomEvent(
        'yac:focus:changed',
        {
          detail: {
            focused: this.#focused,
          },
        }
      )
      this._emit(eChanged)

      return true
    }

    blur() {
      if (!this.#focused) return false

      const e: MixinEventMap['yac:blur'] = new CustomEvent('yac:blur', {
        cancelable: true,
      })
      this._emit(e)

      if (e.defaultPrevented) return false
      this.#focused = false

      const eChanged: MixinEventMap['yac:focus:changed'] = new CustomEvent(
        'yac:focus:changed',
        {
          detail: {
            focused: this.#focused,
          },
        }
      )
      this._emit(eChanged)

      return true
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
