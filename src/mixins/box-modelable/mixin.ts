import { ComposeConstructor } from '../../types'
import { getBounds } from '../../utils/get-bounds'

import {
  BoxModelableMixinBase,
  BoxModelableMixinClass,
  BoxModelableMixinInstance,
  BoxModelableMixinOptions,
} from './types'

export default function BoxModelableMixin<
  T extends new (o: any) => BoxModelableMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: BoxModelableMixinOptions
    ) => BoxModelableMixinBase)
    implements BoxModelableMixinInstance {
    #bounds?: ReturnType<typeof getBounds>

    render() {
      this.calculate()
      super.render()
    }

    refresh() {
      this.calculate()
      super.refresh()
    }

    get width() {
      return this.#bounds?.widthMargin || 0
    }

    get height() {
      return this.#bounds?.heightMargin || 0
    }

    private calculate() {
      this.#bounds = getBounds(this.element)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    BoxModelableMixinClass,
    typeof Base
  >
}
