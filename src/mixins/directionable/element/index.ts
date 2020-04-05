import { ComposeConstructor } from '../../../types'

import { Direction } from '../core/types'

import { MixinBase, MixinClass, MixinInstance, MixinOptions } from './types'

export default function DirectionableElementMixin<
  T extends new (o: any) => MixinBase
>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #originalDirectionStyle: { value: string; priority: string } = {
      value: '',
      priority: '',
    }

    render() {
      super.render()

      // store original direction style if one was set
      this.#originalDirectionStyle = {
        value: this.element.style.getPropertyValue('direction'),
        priority: this.element.style.getPropertyPriority('direction'),
      }

      this._directionableElementSetDirectionStyle()
    }

    refresh() {
      super.refresh()
      this._directionableElementSetDirectionStyle()
    }

    destroy() {
      this._directionableElementResetDirectionStyle()
      this.destroy()
    }

    directionAutoUpdate(defaultDirection?: Direction) {
      this._directionableElementResetDirectionStyle()

      const directionAttr = getComputedStyle(this.element).direction
      if (directionAttr === 'ltr' || directionAttr === 'rtl') {
        defaultDirection = directionAttr
      }

      return super.directionAutoUpdate(defaultDirection)
    }

    private _directionableElementSetDirectionStyle() {
      this._directionableElementResetDirectionStyle()

      const direction = getComputedStyle(this.element).direction
      if (direction === this.direction) return

      this.element.style.setProperty('direction', this.direction, 'important')
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

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
