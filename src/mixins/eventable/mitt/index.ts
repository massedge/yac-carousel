import mitt, { Emitter } from 'mitt'

import { ComposeConstructor } from '../../../types'

import { MixinBase, MixinClass, MixinInstance, MixinOptions } from './types'

export default function MittEventableMixin<T extends new (o: any) => MixinBase>(
  Base: T
) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #emitter: MixinInstance['emitter']

    get emitter() {
      return this.#emitter
    }

    constructor(options: MixinOptions) {
      super(options)

      const emitter: Emitter = mitt()

      this.#emitter = {
        on(type: string, listener: (evt: CustomEvent) => void) {
          emitter.on(type, listener)
        },

        off(type: string, listener: (evt: CustomEvent) => void) {
          emitter.off(type, listener)
        },

        emit(e: CustomEvent) {
          emitter.emit(e.type, e)
        },
      }
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
