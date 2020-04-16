import { ComposeConstructor } from '../../../types'

import {
  ItemizableCoreMixinBase,
  ItemizableCoreMixinClass,
  ItemizableCoreMixinInstance,
  ItemizableCoreMixinOptions,
  ItemizableCoreMixinItemBase,
} from './types'

export default function ItemizableCoreMixin<
  T extends new (o: any) => ItemizableCoreMixinBase,
  S extends new (...args: any[]) => ItemizableCoreMixinItemBase
>(Base: T, ItemBase?: S) {
  type Item = InstanceType<S>

  class Mixin
    extends (Base as new (
      options: ItemizableCoreMixinOptions<Item>
    ) => ItemizableCoreMixinBase)
    implements ItemizableCoreMixinInstance<Item> {
    #items: Item[]

    constructor({
      items = [],
      ...otherOptions
    }: ItemizableCoreMixinOptions<Item>) {
      super({
        items,
        ...otherOptions,
      })

      this.#items = items
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
    ItemizableCoreMixinClass<Item>,
    typeof Base
  >
}
