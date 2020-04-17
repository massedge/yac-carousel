import { ComposeConstructor } from '../../types'

import {
  OrientationValue,
  MixinBase,
  MixinClass,
  MixinInstance,
  MixinOptions,
} from './types'

export default function OrientationableMixin<
  T extends new (o: any) => MixinBase
>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #orientation: OrientationValue

    constructor({ orientation = 'horizontal', ...otherOptions }: MixinOptions) {
      super({ orientation, ...otherOptions })
      this.#orientation = orientation
    }

    get orientation() {
      return this.#orientation
    }

    set orientation(value) {
      if (value === this.#orientation) return
      this.#orientation = value
      this.refresh()
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
