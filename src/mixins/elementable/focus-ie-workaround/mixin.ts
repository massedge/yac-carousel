import { ComposeConstructor } from '../../../types'

import {
  ElementableFocusIEWorkaroundMixinBase,
  ElementableFocusIEWorkaroundMixinClass,
  ElementableFocusIEWorkaroundMixinInstance,
} from './types'

declare global {
  interface Document {
    /**
     * Define IE-specific document property in order to detect browser
     */
    documentMode?: number
  }

  interface HTMLElement {
    /**
     * Define IE-specific matches property in order to detect browser
     */
    msMatchesSelector(selectors: string): boolean

    /**
     * Make it easier to test for disabled property
     */
    disabled?: boolean
  }
}

/**
 * IE <= 11 allows focus on any html element. In order to work around this, we prevent the default mousedown event
 * on non-focusable items, in order to prevent them from being focused.
 * @param Base
 */
export default function ElementableFocusIEWorkaroundMixin<
  T extends new (o: any) => ElementableFocusIEWorkaroundMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      ...args: any[]
    ) => ElementableFocusIEWorkaroundMixinBase)
    implements ElementableFocusIEWorkaroundMixinInstance {
    #mousedownHandler: (this: HTMLElement, ev: FocusEvent) => void

    constructor(...args: any[]) {
      super(...args)

      this.#mousedownHandler = (e) => {
        if (!(e.target instanceof HTMLElement)) return

        // prevent focus on unfocusable element
        if (
          !e.target.msMatchesSelector(focusableCandidateSelector) ||
          e.target.disabled
        ) {
          e.preventDefault()
        }
      }
    }

    render() {
      super.render()
      if (isIE()) {
        this.element.addEventListener('mousedown', this.#mousedownHandler)
      }
    }

    destroy() {
      super.destroy()
      if (isIE()) {
        this.element.removeEventListener('mousedown', this.#mousedownHandler)
      }
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    ElementableFocusIEWorkaroundMixinClass,
    typeof Base
  >
}

// Based on tabbable library @see https://github.com/davidtheclark/tabbable/
// @see https://github.com/davidtheclark/tabbable/blob/4f88b5b0c0b3a6d2372a4f45bbffea368ec92060/src/index.js#L1-L11
// @see https://github.com/davidtheclark/tabbable/blob/4f88b5b0c0b3a6d2372a4f45bbffea368ec92060/src/index.js#L96
const focusableCandidateSelector = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  'iframe',
].join(',')

const isIE = () => {
  return !!window.document.documentMode
}
