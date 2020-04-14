import { ComposeConstructor } from '../../../types'

import {
  ControllableLoopMixinBase,
  ControllableLoopMixinClass,
  ControllableLoopMixinInstance,
  ControllableLoopMixinOptions,
} from './types'

export default function ControllableLoopMixin<
  T extends new (o: any) => ControllableLoopMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: ControllableLoopMixinOptions
    ) => ControllableLoopMixinBase)
    implements ControllableLoopMixinInstance {
    #loop: boolean

    get loop() {
      return this.#loop
    }
    set loop(value) {
      this.#loop = value
    }

    constructor({
      loop = false,
      ...otherOptions
    }: ControllableLoopMixinOptions) {
      super({ loop, ...otherOptions })
      this.#loop = loop
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    ControllableLoopMixinClass,
    typeof Base
  >
}
