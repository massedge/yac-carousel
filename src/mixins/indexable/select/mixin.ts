import { ComposeConstructor } from '../../../types'

import {
  IndexableSelectMixinClass,
  IndexableSelectMixinBase,
  IndexableSelectMixinOptions,
  IndexableSelectMixinInstance,
  IndexableSelectMixinEventMap,
} from './types'

export default function IndexableSelectMixin<
  T extends new (o: any) => IndexableSelectMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: IndexableSelectMixinOptions
    ) => IndexableSelectMixinBase)
    implements IndexableSelectMixinInstance {
    #index: number

    constructor({ index = 0, ...otherOptions }: IndexableSelectMixinOptions) {
      super({ index, ...otherOptions })

      this.#index = index
    }

    on<K extends keyof IndexableSelectMixinEventMap>(
      type: K,
      listener: (ev: IndexableSelectMixinEventMap[K]) => void
    ) {
      return this.emitter.on.call(this, type, listener)
    }

    off<K extends keyof IndexableSelectMixinEventMap>(
      type: K,
      listener: (ev: IndexableSelectMixinEventMap[K]) => void
    ) {
      return this.emitter.off.call(this, type, listener)
    }

    get index() {
      return this.#index
    }

    select(index: number) {
      const from = this.index

      const eBefore: IndexableSelectMixinEventMap['yac:select:before'] = new CustomEvent(
        'yac:select:before',
        {
          cancelable: true,
          detail: {
            from,
            to: index,
          },
        }
      )
      this.emitter.emit(eBefore)

      // to index may have been changed by an event handler, so use it instead of the original index
      index = eBefore.detail.to

      if (eBefore.defaultPrevented || eBefore.detail.to === index) {
        return false
      }

      this.#index = index

      const eAfter: IndexableSelectMixinEventMap['yac:select:after'] = new CustomEvent(
        'yac:select:after',
        {
          detail: {
            from,
            to: index,
          },
        }
      )
      this.emitter.emit(eAfter)

      return true
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    IndexableSelectMixinClass,
    typeof Base
  >
}
