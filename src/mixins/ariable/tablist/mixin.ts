import AriaTablist from 'aria-tablist'

import { ComposeConstructor } from '../../../types'

import {
  AriableTablistMixinBase,
  AriableTablistMixinClass,
  AriableTablistMixinInstance,
  AriableTablistMixinOptions,
} from './types'

export default function AriableTablistMixin<
  T extends {
    new (options: any): AriableTablistMixinBase
  }
>(Base: T) {
  class Mixin
    extends ((Base as unknown) as new (
      options: AriableTablistMixinOptions
    ) => AriableTablistMixinBase)
    implements AriableTablistMixinInstance {
    #ariaTablistInstance?: typeof AriaTablist
    #originalAriaOrientationAttribute?: string

    render() {
      super.render()

      // set orientation
      if (this.orientation) {
        this.#originalAriaOrientationAttribute =
          this.element.getAttribute('aria-orientation') ?? undefined
        this.element.setAttribute('aria-orientation', this.orientation)
      }

      this.#ariaTablistInstance = new AriaTablist(this.element)
    }

    destroy() {
      super.destroy()

      this.#ariaTablistInstance.destroy()

      // reset aria-orientation attribute
      if (this.orientation) {
        if (this.#originalAriaOrientationAttribute !== undefined) {
          this.element.setAttribute(
            'aria-orientation',
            this.#originalAriaOrientationAttribute
          )
        } else {
          this.element.removeAttribute('aria-orientation')
        }
      }
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    AriableTablistMixinClass,
    typeof Base
  >
}
