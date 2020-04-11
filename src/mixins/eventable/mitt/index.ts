import mitt, { Emitter } from 'mitt'

import { ComposeConstructor } from '../../../types'

import { MixinBase, MixinClass, MixinInstance, MixinOptions } from './types'

export default function MittEventableMixin<T extends new (o: any) => MixinBase>(
  Base: T
) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #emitter: Emitter = mitt()

    _on(type: string, listener: (evt: CustomEvent) => void) {
      this.#emitter.on(type, listener)
    }

    off(type: string, listener: (evt: CustomEvent) => void) {
      this.#emitter.off(type, listener)
    }

    _emit(e: CustomEvent) {
      this.#emitter.emit(e.type, e)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
