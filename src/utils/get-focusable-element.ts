declare global {
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

// Based on tabbable library @see https://github.com/davidtheclark/tabbable/
// @see https://github.com/davidtheclark/tabbable/blob/4f88b5b0c0b3a6d2372a4f45bbffea368ec92060/src/index.js#L1-L11
// @see https://github.com/davidtheclark/tabbable/blob/4f88b5b0c0b3a6d2372a4f45bbffea368ec92060/src/index.js#L96
const focusableSelector =
  'input,select,textarea,a[href],button,[tabindex],audio[controls],video[controls],[contenteditable]:not([contenteditable="false"]),iframe'

const matches =
  HTMLElement.prototype.matches ||
  HTMLElement.prototype.msMatchesSelector ||
  HTMLElement.prototype.webkitMatchesSelector

export interface Options {
  selector?: string
}

/**
 * Return target if focusable or closest ancestor that is focusable
 * @param target
 * @param options
 */
const getFocusableElement = (
  target: HTMLElement | (Node & ParentNode) | null,
  { selector = focusableSelector }: Options = { selector: focusableSelector }
): HTMLElement | null => {
  while (true) {
    if (!(target instanceof HTMLElement)) return null

    if (matches.call(target, selector)) {
      // if disabled, then it is not focusable
      if (target.disabled) return null
      return target
    }

    // check if parent node is focusable
    target = target.parentNode
  }
}

export default getFocusableElement
