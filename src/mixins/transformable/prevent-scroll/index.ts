import { ComposeConstructor } from '../../../types'

import { MixinBase, MixinClass, MixinInstance, MixinOptions } from './types'

/**
 * When there are tabbable elements inside the container element and the user
 * tabs to one of those elements that is outside of the bounds of the container element (overflowed),
 * the browser automatically scrolls the container in order to bring the focused element into view.
 * In order to ensure this behavior doesn't throw off various element positioning, we
 * reset the scroll offset back to 0.
 * This behavior has been observed in Chrome, but other browsers may also be affected.
 * @param Base
 */
export default function TransformablePreventScroll<
  T extends new (o: any) => MixinBase
>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #scrollHandler?: (this: HTMLElement, ev: Event) => void

    render() {
      this._preventScrollResetScroll()

      super.render()

      this.#scrollHandler = (e) => {
        if (e.target !== this.element) return
        this._preventScrollResetScroll()
      }

      this.element.addEventListener('scroll', this.#scrollHandler)
    }

    destroy() {
      if (this.#scrollHandler) {
        this.element.removeEventListener('scroll', this.#scrollHandler)
      }
      super.destroy()
    }

    private _preventScrollResetScroll() {
      this.element.scrollLeft = 0
      this.element.scrollTop = 0
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
