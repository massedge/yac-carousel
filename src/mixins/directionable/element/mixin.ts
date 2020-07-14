import { ComposeConstructor } from '../../../types'

import { Direction, DirectionableCoreMixinEventMap } from '../core'

import {
  DirectionableElementMixinBase,
  DirectionableElementMixinClass,
  DirectionableElementMixinInstance,
  DirectionableElementMixinOptions,
} from './types'

/**
 * Uses the CSS [direction](https://developer.mozilla.org/en-US/docs/Web/CSS/direction) property to apply/retrieve overall direction.
 * @param Base
 */
export default function DirectionableElementMixin<
  T extends new (o: any) => DirectionableElementMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: DirectionableElementMixinOptions
    ) => DirectionableElementMixinBase)
    implements DirectionableElementMixinInstance {
    #computeAutoHandler: (
      e: DirectionableCoreMixinEventMap['yac:computed-direction:compute-auto']
    ) => void
    #originalDirectionStyle: { value: string; priority: string } = {
      value: '',
      priority: '',
    }

    constructor(options: DirectionableElementMixinOptions) {
      super(options)

      this.#computeAutoHandler = (e) => {
        if (e.defaultPrevented) return

        this._directionableElementResetDirectionStyle()

        const computedDirection = getComputedStyle(this.element).direction
        if (computedDirection === 'ltr' || computedDirection === 'rtl') {
          e.detail.computedDirection = computedDirection
        }

        this._directionableElementSetDirectionStyle(e.detail.computedDirection)
      }

      this.on('yac:computed-direction:compute-auto', this.#computeAutoHandler)
    }

    refresh() {
      super.refresh()
      this._directionableElementSetDirectionStyle(this.computedDirection)
    }

    render() {
      super.render()

      // store original direction style if one was set
      this.#originalDirectionStyle = {
        value: this.element.style.getPropertyValue('direction'),
        priority: this.element.style.getPropertyPriority('direction'),
      }

      this._directionableElementSetDirectionStyle(this.computedDirection)
    }

    destroy() {
      this.off('yac:computed-direction:compute-auto', this.#computeAutoHandler)
      this._directionableElementResetDirectionStyle()
      super.destroy()
    }

    private _directionableElementSetDirectionStyle(
      direction: Exclude<Direction, 'auto'>
    ) {
      this._directionableElementResetDirectionStyle()

      const computerStyleDirection = getComputedStyle(this.element).direction
      if (computerStyleDirection === direction) return

      this.element.style.setProperty('direction', direction, 'important')
    }

    private _directionableElementResetDirectionStyle() {
      if (this.#originalDirectionStyle.value) {
        this.element.style.setProperty(
          'direction',
          this.#originalDirectionStyle.value,
          this.#originalDirectionStyle.priority
        )
      } else {
        this.element.style.removeProperty('direction')
      }
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    DirectionableElementMixinClass,
    typeof Base
  >
}
