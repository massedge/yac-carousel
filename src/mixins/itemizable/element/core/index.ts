import { ComposeConstructor } from '../../../../types'
import {
  MixinBase,
  MixinBaseOptions,
  MixinClass,
  MixinInstance,
  MixinOptions,
  MixinItemBase,
  MixinItemConstructor,
} from './types'

type BaseWithoutItemsOption<B> = B extends new (options: infer O) => infer R
  ? { new (options: Omit<O, 'items'>): R }
  : never

/**
 * Expands initial carousel item types to support HTMLElement[], NodeList, or HTMLCollection
 * by supplying the item constructor explicitly.
 * @param Base
 * @param ItemBase
 */
export default function ItemizableElementCore<
  T extends new (o: any) => MixinBase,
  Item extends MixinItemBase
>(Base: T, ItemBase: MixinItemConstructor<Item>) {
  class Mixin
    extends (Base as new (
      options: MixinBaseOptions<MixinItemBase>
    ) => MixinBase)
    implements MixinInstance<Item> {
    #itemConstructor: typeof ItemBase

    constructor({
      items = [],
      itemConstructor = ItemBase,
      ...otherOptions
    }: MixinOptions<Item>) {
      super({
        items: normalizeItems(items, itemConstructor),
        ...otherOptions,
      })

      this.#itemConstructor = itemConstructor
    }

    get itemConstructor(): typeof ItemBase {
      return this.#itemConstructor
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    MixinClass<Item>,
    BaseWithoutItemsOption<typeof Base>
  >
}

const normalizeItems = <Item extends MixinItemBase>(
  items: NonNullable<MixinOptions<Item>['items']>,
  itemConstructor: NonNullable<MixinOptions<Item>['itemConstructor']>
): Item[] => {
  if (items instanceof HTMLCollection) {
    return Array.prototype.slice
      .call<HTMLCollection, Parameters<Element[]['slice']>, Element[]>(items)
      .filter(
        (child: Element): child is HTMLElement => child instanceof HTMLElement
      )
      .map((element) => new itemConstructor({ element }))
  } else if (items instanceof NodeList) {
    return Array.prototype.slice
      .call<NodeList, Parameters<Node[]['slice']>, Node[]>(items)
      .filter(
        (child: Node): child is HTMLElement => child instanceof HTMLElement
      )
      .map((element) => new itemConstructor({ element }))
  } else if (isHTMLElementArray(items)) {
    return items.map((element) => new itemConstructor({ element }))
  } else {
    return items
  }
}

function isHTMLElementArray(arr: any): arr is HTMLElement[] {
  if (!(arr instanceof Array)) return false

  for (const item of arr) {
    if (!(item instanceof HTMLElement)) return false
  }

  return true
}
