import { ComposeConstructor } from '../../../types'
import {
  MixinBase,
  MixinClass,
  MixinInstance,
  MixinOptions,
  MixinItemBase,
} from './types'

export default function ItemizableCore<
  T extends new (o: any) => MixinBase,
  S extends new (...args: any[]) => MixinItemBase
>(Base: T, ItemBase?: S) {
  type Item = InstanceType<S>

  class Mixin extends (Base as new (options: MixinOptions<Item>) => MixinBase)
    implements MixinInstance<Item> {
    #items: Item[]

    constructor({ items = [], ...otherOptions }: MixinOptions<Item>) {
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

  return (Mixin as unknown) as ComposeConstructor<MixinClass<Item>, typeof Base>
}
