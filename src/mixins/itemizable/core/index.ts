import { ComposeConstructor } from '../../../types'
import {
  ItemizableCoreMixin,
  ItemizableCoreBase,
  ItemizableCoreInstance,
  ItemizableCoreOptions,
  ItemizableItemBase,
  ItemizableItemConstructor,
} from './types'

export default function ItemizableCore<
  T extends new (o: any) => ItemizableCoreBase,
  Item extends ItemizableItemBase
>(Base: T, ItemBase: ItemizableItemConstructor<Item>) {
  class Mixin
    extends (Base as new (
      options: ItemizableCoreOptions<Item>
    ) => ItemizableCoreBase)
    implements ItemizableCoreInstance<Item> {
    #items: Item[]
    // #itemConstructor: typeof ItemBase

    constructor({
      items = [],
      // itemConstructor = ItemBase,
      ...otherOptions
    }: ItemizableCoreOptions<Item>) {
      super({
        items,
        // itemConstructor,
        ...otherOptions,
      })

      this.#items = items
      // this.#itemConstructor = itemConstructor
    }

    get items(): readonly Item[] {
      return this.#items
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

  return (Mixin as unknown) as ComposeConstructor<
    ItemizableCoreMixin<Item>,
    typeof Base
  >
}
