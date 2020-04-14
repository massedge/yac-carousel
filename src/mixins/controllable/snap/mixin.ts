import { ComposeConstructor } from '../../../types'

import {
  ControllableSnapMixinBase,
  ControllableSnapMixinClass,
  ControllableSnapMixinInstance,
  ControllableSnapMixinOptions,
} from './types'

export default function ControllableSnapMixin<
  T extends new (o: any) => ControllableSnapMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: ControllableSnapMixinOptions
    ) => ControllableSnapMixinBase)
    implements ControllableSnapMixinInstance {
    #snap: boolean

    get snap() {
      return this.#snap
    }
    set snap(value) {
      this.#snap = value
    }

    constructor({
      snap = false,
      ...otherOptions
    }: ControllableSnapMixinOptions) {
      super({ snap, ...otherOptions })
      this.#snap = snap
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    ControllableSnapMixinClass,
    typeof Base
  >
}
