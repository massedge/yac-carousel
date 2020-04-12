import { ComposeConstructor } from '../../../types'
import {
  MixinBase,
  MixinClass,
  MixinInstance,
  MixinOptions,
  MixinItemBase,
  MixinItemConstructor,
} from './types'

export default function ItemizableCore<
  T extends new (o: any) => MixinBase,
  Item extends MixinItemBase
>(Base: T, ItemBase: MixinItemConstructor<Item>) {
  class Mixin extends (Base as new (options: MixinOptions<Item>) => MixinBase)
    implements MixinInstance<Item> {
    #items: Item[]
    #itemConstructor: typeof ItemBase

    constructor({
      items = [],
      itemConstructor = ItemBase,
      ...otherOptions
    }: MixinOptions<Item>) {
      super({
        items,
        itemConstructor,
        ...otherOptions,
      })

      this.#items = items
      this.#itemConstructor = itemConstructor
    }

    get items(): readonly Item[] {
      return this.#items
    }

    get itemConstructor(): typeof ItemBase {
      return this.#itemConstructor
    }

    refresh() {
      this.items.forEach((item) => item.refresh())
      super.refresh()
    }

    destroy() {
      this.#items = []
      super.destroy()
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass<Item>, typeof Base>
}
