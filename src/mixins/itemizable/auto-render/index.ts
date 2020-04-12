import { ComposeConstructor } from '../../../types'

import {
  MixinClass,
  MixinBase,
  MixinInstance,
  MixinOptions,
  MixinItemBase,
} from './types'

/**
 * Unrendered items will be automatically rendered when rendering the item container. They will also be
 * automatically destroyed when destroying the item container.
 * @param Base
 */
export default function ItemizableAutoRender<
  T extends new (o: any) => MixinBase<Item>,
  Item extends MixinItemBase
>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase<Item>)
    implements MixinInstance {
    #renderedItems: Item[] = []

    render() {
      // ensure all items are rendered
      this.#renderedItems = this.items.filter((item) => !item.rendered)
      this.#renderedItems.forEach((item) => item.render())

      super.render()
    }

    destroy() {
      super.destroy()

      this.#renderedItems.forEach((item) => item.destroy())
      this.#renderedItems = []
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
