import { ComposeConstructor } from '../../../types'

import {
  OrientableTouchActionMixinBase,
  OrientableTouchActionMixinClass,
  OrientableTouchActionMixinInstance,
  OrientableTouchActionMixinOptions,
} from './types'

export default function OrientableTouchActionMixin<
  T extends new (o: any) => OrientableTouchActionMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: OrientableTouchActionMixinOptions
    ) => OrientableTouchActionMixinBase)
    implements OrientableTouchActionMixinInstance {
    #originalTouchActionStyle: { value: string; priority: string } = {
      value: '',
      priority: '',
    }

    render() {
      super.render()

      // store original  style if one was set
      this.#originalTouchActionStyle = {
        value: this.element.style.getPropertyValue('touch-action'),
        priority: this.element.style.getPropertyPriority('touch-action'),
      }

      this._orientableTouchActionSetStyle()
    }

    destroy() {
      this._orientableTouchActionResetStyle()
      super.destroy()
    }

    private _orientableTouchActionSetStyle() {
      this._orientableTouchActionResetStyle()

      const touchAction = getComputedStyle(this.element)
        .touchAction.split(' ')
        .sort()
        .join(' ')
      const targetTouchAction = [
        this.orientation === 'horizontal' ? 'pan-y' : 'pan-x',
        'pinch-zoom',
      ].join(' ')

      if (touchAction === targetTouchAction) return

      this.element.style.setProperty(
        'touch-action',
        targetTouchAction,
        'important'
      )
    }

    private _orientableTouchActionResetStyle() {
      if (this.#originalTouchActionStyle.value) {
        this.element.style.setProperty(
          'touch-action',
          this.#originalTouchActionStyle.value,
          this.#originalTouchActionStyle.priority
        )
      } else {
        this.element.style.removeProperty('touch-action')
      }
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    OrientableTouchActionMixinClass,
    typeof Base
  >
}
