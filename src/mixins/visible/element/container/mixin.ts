import { ComposeConstructor } from '../../../../types'

import {
  VisibleElementContainerMixinBase,
  VisibleElementContainerMixinClass,
  VisibleElementContainerMixinInstance,
  VisibleElementContainerMixinItem,
  VisibleElementContainerMixinOptions,
} from './types'

export default function VisibleContainerElementMixin<
  T extends new (o: any) => VisibleElementContainerMixinBase<Item>,
  Item extends VisibleElementContainerMixinItem
>(Base: T) {
  class Mixin
    extends (Base as new (...a: any[]) => VisibleElementContainerMixinBase<
      Item
    >)
    implements VisibleElementContainerMixinInstance {
    #io: IntersectionObserver

    constructor({
      element,
      ...otherOptions
    }: VisibleElementContainerMixinOptions) {
      super({ element, ...otherOptions })

      this.#io = new IntersectionObserver(
        (entries) => {
          entries.map((entry) => {
            this.items
              .filter((item: Item) => item.element === entry.target)
              .forEach((item: Item) => (item.visible = entry.isIntersecting))
          })
        },
        {
          root: element,
        }
      )
    }

    render() {
      super.render()
      this.items.map((item: Item) => this.#io.observe(item.element))
    }

    destroy() {
      super.destroy()
      this.items.map((item: Item) => this.#io.unobserve(item.element))
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    VisibleElementContainerMixinClass,
    typeof Base
  >
}
