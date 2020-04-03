import { ComposeConstructor } from '../../../types'

import { Direction } from '../core/types'

import { MixinBase, MixinClass, MixinInstance, MixinOptions } from './types'

export default function DirectionableElementMixin<
  T extends new (o: any) => MixinBase
>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #originalDirectionAttr: string | null = null

    render() {
      super.render()

      // store original attribute if one was set
      this.#originalDirectionAttr = this.element.getAttribute('dir')

      this._directionableElementSetAttribute()
    }

    refresh() {
      super.refresh()
      this._directionableElementSetAttribute()
    }

    destroy() {
      this._directionableElementResetDirAttribute()
      this.destroy()
    }

    directionAutoUpdate(defaultDirection?: Direction) {
      this._directionableElementResetDirAttribute()

      const directionAttr = getComputedStyle(this.element).direction
      if (directionAttr === 'ltr' || directionAttr === 'rtl') {
        defaultDirection = directionAttr
      }

      return super.directionAutoUpdate(defaultDirection)
    }

    private _directionableElementSetAttribute() {
      this.element.removeAttribute('dir')

      const direction = getComputedStyle(this.element).direction
      if (direction === this.direction) return

      this.element.setAttribute('dir', this.direction)
    }

    private _directionableElementResetDirAttribute() {
      if (this.#originalDirectionAttr) {
        this.element.setAttribute('dir', this.#originalDirectionAttr)
      } else {
        this.element.removeAttribute('dir')
      }
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
