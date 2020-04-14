import { ComposeConstructor } from '../../../types'

import { MixinBase, MixinClass, MixinInstance, MixinOptions } from './types'

export default function EventableElement<T extends new (o: any) => MixinBase>(
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

      this.#emitter = {
        on: (type: string, listener: (evt: CustomEvent) => void) => {
          this.element.addEventListener(
            type,
            // @see https://github.com/Microsoft/TypeScript/issues/28357
            listener as EventListener
          )
        },

        off: (type: string, listener: (evt: CustomEvent) => void) => {
          this.element.removeEventListener(
            type,
            // @see https://github.com/Microsoft/TypeScript/issues/28357
            listener as EventListener
          )
        },

        emit: (e: CustomEvent) => {
          this.element.dispatchEvent(e)
        },
      }
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
