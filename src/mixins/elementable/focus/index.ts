import { ComposeConstructor } from '../../../types'

import { MixinBase, MixinClass, MixinInstance, MixinOptions } from './types'
import { MixinEventMap as FocusableMixinEventMap } from '../../focusable/types'

/**
 * Keep track whether the root element or one of its decendents has focus.
 * @param Base
 */
export default function ElementableFocus<T extends new (o: any) => MixinBase>(
  Base: T
) {
  class Mixin extends (Base as new (...args: any[]) => MixinBase)
    implements MixinInstance {
    #focusHandler: (this: HTMLElement, ev: FocusEvent) => void
    #blurHandler: (this: HTMLElement, ev: FocusEvent) => void
    #preventBlurHandler: (e: FocusableMixinEventMap['yacc:blur']) => void
    #focused: boolean = false

    constructor(...args: any[]) {
      super(...args)

      this.#preventBlurHandler = (e) => e.preventDefault()

      this.#focusHandler = (e) => {
        this.element.removeEventListener('focusin', this.#focusHandler)
        this.element.addEventListener('focusout', this.#blurHandler)
        this.focus()
        this.on('yacc:blur', this.#preventBlurHandler)
        this.#focused = true
      }

      this.#blurHandler = (e) => {
        if (
          e.relatedTarget instanceof HTMLElement &&
          (e.relatedTarget === this.element ||
            this.element.contains(e.relatedTarget))
        ) {
          return
        }

        this.off('yacc:blur', this.#preventBlurHandler)
        this.blur()
        this.#focused = false
        this.element.addEventListener('focusin', this.#focusHandler)
        this.element.removeEventListener('focusout', this.#focusHandler)
      }
    }

    render() {
      super.render()
      this.element.addEventListener('focusin', this.#focusHandler)
    }

    destroy() {
      if (!this.#focused) {
        this.element.removeEventListener('focusin', this.#focusHandler)
      } else {
        this.off('yacc:blur', this.#preventBlurHandler)
        this.element.removeEventListener('focusout', this.#blurHandler)
      }
      super.destroy()
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
