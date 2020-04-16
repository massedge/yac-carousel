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

    select(targetIndex: number) {
      const fromIndex = this.index

      // normalize toIndex to be within bounds of items array
      let toIndex = targetIndex
      if (toIndex >= this.items.length) toIndex = this.items.length - 1
      if (toIndex < 0) toIndex = 0

      const eBefore: IndexableSelectMixinEventMap['yac:select:before'] = new CustomEvent(
        'yac:select:before',
        {
          cancelable: true,
          bubbles: false,
          detail: {
            fromIndex,
            targetIndex,
            toIndex,
          },
        }
      )
      this.emitter.emit(eBefore)

      // use toIndex as returned by the event handler
      toIndex = eBefore.detail.toIndex

      // ensure toIndex is not out of bounds
      if (toIndex < 0 || toIndex >= this.items.length) {
        throw new Error('item index out of bounds')
      }

      if (eBefore.defaultPrevented || fromIndex === toIndex) {
        return false
      }

      this.#index = toIndex

      const eAfter: IndexableSelectMixinEventMap['yac:select:after'] = new CustomEvent(
        'yac:select:after',
        {
          bubbles: false,
          detail: {
            fromIndex,
            targetIndex,
            toIndex,
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
