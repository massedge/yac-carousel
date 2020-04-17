import { ComposeConstructor } from '../../../types'
import { ControllableCoreMixinAction } from '../core'
import Nudge from '../../../classes/nudge'

import {
  ControllableSelectMixinBase,
  ControllableSelectMixinClass,
  ControllableSelectMixinInstance,
  ControllableSelectMixinItemBase,
  ControllableSelectMixinOptions,
} from './types'

export default function ControllableSelectMixin<
  T extends new (o: any) => ControllableSelectMixinBase<Item>,
  Item extends ControllableSelectMixinItemBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: ControllableSelectMixinOptions
    ) => ControllableSelectMixinBase<Item>)
    implements ControllableSelectMixinInstance {
    constructor({ ...otherOptions }: ControllableSelectMixinOptions) {
      super({ ...otherOptions })
    }

    render() {
      super.render()

      this.on('yac:select:after', (e) => {
        const fromItem = this.items[e.detail.fromIndex]
        const toItem = this.items[e.detail.toIndex]

        // update active
        fromItem.active = false
        toItem.active = true

        // new position
        const actions = this._controllableSelect(
          e.detail.toIndex,
          this.orientation
        )
        this._processControllerActions(actions)
      })
    }

    private _controllableSelect(
      index: number,
      axis: 'horizontal' | 'vertical'
    ): ControllableCoreMixinAction[] {
      const targetPosition = this._controllerItems
        .slice(0, index)
        .reduce(
          (position, item) =>
            (position -= axis === 'horizontal' ? item.width : item.height),
          0
        )

      const distance =
        targetPosition -
        (axis === 'horizontal' ? this._position.x : this._position.y)

      return this._controllableNudge({
        nudge: new Nudge({
          x: axis === 'horizontal' ? distance : 0,
          y: axis === 'vertical' ? distance : 0,
        }),
        ease: true,
        axis,
      })
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    ControllableSelectMixinClass,
    typeof Base
  >
}
