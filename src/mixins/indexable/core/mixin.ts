import { ComposeConstructor } from '../../../types'

import {
  IndexableCoreMixinClass,
  IndexableCoreMixinBase,
  IndexableCoreMixinOptions,
  IndexableCoreMixinInstance,
  IndexableCoreMixinEventMap,
} from './types'

export default function IndexableCoreMixin<
  T extends new (o: any) => IndexableCoreMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: IndexableCoreMixinOptions
    ) => IndexableCoreMixinBase)
    implements IndexableCoreMixinInstance {
    #index: number

    constructor({ index = 0, ...otherOptions }: IndexableCoreMixinOptions) {
      super({ index, ...otherOptions })

      this.#index = index
    }

    on<K extends keyof IndexableCoreMixinEventMap>(
      type: K,
      listener: (ev: IndexableCoreMixinEventMap[K]) => void
    ) {
      return this.emitter.on.call(this, type, listener)
    }

    off<K extends keyof IndexableCoreMixinEventMap>(
      type: K,
      listener: (ev: IndexableCoreMixinEventMap[K]) => void
    ) {
      return this.emitter.off.call(this, type, listener)
    }

    get index() {
      return this.#index
    }

    canSelect(targetIndex: number) {
      const fromIndex = this.index

      // normalize toIndex to be within bounds of items array
      let toIndex = targetIndex
      if (toIndex >= this.items.length) toIndex = this.items.length - 1
      if (toIndex < 0) toIndex = 0

      const eBefore: IndexableCoreMixinEventMap['yac:select:before'] = new CustomEvent(
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

      return toIndex
    }

    select(targetIndex: number) {
      const fromIndex = this.index
      const toIndex = this.canSelect(targetIndex)

      if (toIndex === false) return false

      this.#index = toIndex

      const eAfter: IndexableCoreMixinEventMap['yac:select:after'] = new CustomEvent(
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
    IndexableCoreMixinClass,
    typeof Base
  >
}
