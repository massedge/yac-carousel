import { ComposeConstructor } from '../../types'

import {
  OrientationValue,
  OrientationableMixinBase,
  OrientationableMixinClass,
  OrientationableMixinInstance,
  OrientationableMixinOptions,
} from './types'

export default function OrientationableMixin<
  T extends new (o: any) => OrientationableMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: OrientationableMixinOptions
    ) => OrientationableMixinBase)
    implements OrientationableMixinInstance {
    #orientation: OrientationValue

    constructor({
      orientation = 'horizontal',
      ...otherOptions
    }: OrientationableMixinOptions) {
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

  return (Mixin as unknown) as ComposeConstructor<
    OrientationableMixinClass,
    typeof Base
  >
}
