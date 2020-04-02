import { ComposeConstructor } from '../../../types'

import {
  HorizontalVerticalValue,
  MixinBase,
  MixinClass,
  MixinInstance,
  MixinOptions,
} from './types'

export default function HorizontalVerticalTypeableMixin<
  T extends new (o: any) => MixinBase
>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #type: HorizontalVerticalValue

    constructor({ type = 'horizontal', ...otherOptions }: MixinOptions) {
      super({ type, ...otherOptions })
      this.#type = type
    }

    get type() {
      return this.#type
    }

    set type(value) {
      if (value === this.#type) return
      this.#type = value
      this.refresh()
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
