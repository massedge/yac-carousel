import { ComposeConstructor } from '../../../types'

import { MixinBase, MixinClass, MixinInstance, MixinOptions } from './types'

export default function RefreshableImageLoad<
  T extends new (o: any) => MixinBase
>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #loadHandler?: (e: Event) => void

    render() {
      super.render()

      this.#loadHandler = (e) => {
        if (!(e.target instanceof HTMLElement)) return
        if (e.target.tagName !== 'IMG') return
        this.refresh()
      }
      this.element.addEventListener('load', this.#loadHandler, true)
    }

    destroy() {
      if (this.#loadHandler) {
        this.element.removeEventListener('load', this.#loadHandler, true)
      }
      super.destroy()
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
