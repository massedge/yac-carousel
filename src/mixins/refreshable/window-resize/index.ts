import { ComposeConstructor } from '../../../types'

import { MixinBase, MixinClass, MixinInstance, MixinOptions } from './types'

export default function WindowResizeRefreshableMixin<
  T extends new (o: any) => MixinBase
>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #windowResizeHandler?: () => void

    render() {
      super.render()
      if (typeof window === 'undefined') return

      this.#windowResizeHandler = () => this.refresh()
      window.addEventListener('resize', this.#windowResizeHandler)
    }

    destroy() {
      if (this.#windowResizeHandler) {
        window.removeEventListener('resize', this.#windowResizeHandler)
        this.#windowResizeHandler = undefined
      }
      super.destroy()
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
