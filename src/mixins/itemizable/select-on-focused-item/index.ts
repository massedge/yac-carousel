import { ComposeConstructor } from '../../../types'

import {
  MixinClass,
  MixinBase,
  MixinInstance,
  MixinOptions,
  MixinItemBase,
} from './types'

/**
 * When an item becomes focused, that item becomes immediately selected in order to ensure
 * it appears within the containing element and not cut off.
 * @param Base
 */
export default function ItemizableSelectOnFocusedItem<
  T extends new (o: any) => MixinBase<Item>,
  Item extends MixinItemBase
>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase<Item>)
    implements MixinInstance {
    #itemFocusHandlers: (() => void)[] = []

    render() {
      super.render()

      this.items.forEach((item, i) => {
        const handler = () => this.select(i)
        item.on('yac:focus', handler)
        this.#itemFocusHandlers.push(handler)
      })
    }

    destroy() {
      this.#itemFocusHandlers.forEach((handler, i) => {
        this.items[i].off('yac:focus', handler)
      })
      this.#itemFocusHandlers = []
      super.destroy()
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
