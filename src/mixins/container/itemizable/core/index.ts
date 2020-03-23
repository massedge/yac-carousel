import { ComposeConstructor } from '../../../../types'
import {
  ItemizableCoreMixin,
  ItemizableCoreBase,
  ItemizableCoreInstance,
  ItemizableCoreOptions,
  ItemizableItemBase,
  // ItemizableItemConstructor,
} from './types'

export default function ItemizableCore<
  Item extends ItemizableItemBase,
  T extends new (o: any) => ItemizableCoreBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: ItemizableCoreOptions<Item>
    ) => ItemizableCoreBase)
    implements ItemizableCoreInstance<Item> {
    #items: Item[]
    // #itemConstructor: ItemizableItemConstructor<Item>

    constructor({
      items = [],
      // itemConstructor,
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
