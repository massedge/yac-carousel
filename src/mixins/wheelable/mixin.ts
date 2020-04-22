import _debounce from 'lodash-es/debounce'

import { ComposeConstructor } from '../../types'

import {
  WheelableMixinBase,
  WheelableMixinClass,
  WheelableMixinInstance,
  WheelableMixinOptions,
} from './types'

export default function WheelableMixin<
  T extends {
    new (options: any): WheelableMixinBase
  }
>(Base: T) {
  class Mixin
    extends ((Base as unknown) as new (
      options: WheelableMixinOptions
    ) => WheelableMixinBase)
    implements WheelableMixinInstance {
    #wheelFn: (e: WheelEvent) => void

    constructor(options: WheelableMixinOptions) {
      super(options)

      // use debounce allow for more fine-grained navigation when using touchpad
      const debounce = _debounce(this.wheel.bind(this), 15, {
        leading: true,
        trailing: true,
      })

      this.#wheelFn = (e) => {
        // TODO: should only prevent if not at the end of previous/next
        // look into using debounce.pending()
        // @see https://github.com/lodash/lodash/issues/4322
        e.preventDefault()
        debounce(e)
      }
    }

    render() {
      super.render()

      this.element.addEventListener('wheel', this.#wheelFn)
    }

    private wheel(e: WheelEvent) {
      // TODO: check if nested element is scrollable
      const offset = this.getWheelEventDelta(e)

      let result
      if (offset < 0) result = this.selectPrevious()
      else if (offset > 0) result = this.selectNext()
      else result = false

      // prevent scrolling of parent elements, if nudge was successful
      if (result) {
        e.preventDefault()
      }
    }

    private getWheelEventDelta(e: WheelEvent) {
      return e.deltaY || e.deltaX
    }

    destroy() {
      this.element.removeEventListener('wheel', this.#wheelFn)
      super.destroy()
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    WheelableMixinClass,
    typeof Base
  >
}
