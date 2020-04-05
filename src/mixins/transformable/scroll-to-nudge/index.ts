import { ComposeConstructor } from '../../../types'

import { MixinBase, MixinClass, MixinInstance, MixinOptions } from './types'
import Nudge from '../../../classes/nudge'

/**
 * When there are tabbable elements inside the container element and the user
 * tabs to one of those elements that is outside of the bounds of the container element (overflowed),
 * the browser automatically scrolls the container in order to bring the focused element into view.
 * In order to ensure this behavior doesn't throw off various element positioning, we
 * reset the scroll offset back to 0, and instead apply a nudge on the container elements.
 * This behavior has been observed in Chrome, but other browsers may also be affected.
 * @param Base
 */
export default function ScrollToNudgeTransformableMixin<
  T extends new (o: any) => MixinBase
>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #scrollHandler?: (this: HTMLElement, ev: Event) => void

    render() {
      super.render()

      this.#scrollHandler = (e) => {
        if (e.target !== this.element) return
        this._scrollToNudgeResetScroll()
      }
      this._scrollToNudgeResetScroll()

      this.element.addEventListener('scroll', this.#scrollHandler)
    }

    destroy() {
      if (this.#scrollHandler) {
        this.element.removeEventListener('scroll', this.#scrollHandler)
      }
      super.destroy()
    }

    private _scrollToNudgeResetScroll() {
      const x = this.element.scrollLeft
      const y = this.element.scrollTop
      if (x === 0 && y === 0) return

      this.nudge({
        nudge: new Nudge({
          x: x !== 0 ? -1 * x : 0,
          y: y !== 0 ? -1 * y : 0,
        }),
        ease: false,
      })
      this.element.scrollLeft = 0
      this.element.scrollTop = 0
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
