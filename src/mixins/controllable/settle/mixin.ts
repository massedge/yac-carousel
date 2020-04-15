import { ComposeConstructor } from '../../../types'
import { ControllableCoreMixinAction } from '../core'
import Nudge from '../../../classes/nudge'

import {
  ControllableSettleMixinBase,
  ControllableSettleMixinClass,
  ControllableSettleMixinInstance,
  ControllableSettleMixinOptions,
} from './types'

export default function ControllableSettleMixin<
  T extends new (o: any) => ControllableSettleMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: ControllableSettleMixinOptions
    ) => ControllableSettleMixinBase)
    implements ControllableSettleMixinInstance {
    constructor({ ...otherOptions }: ControllableSettleMixinOptions) {
      super({ ...otherOptions })
    }

    render() {
      super.render()

      this.on('yac:settle', (e): void => {
        // console.log('settle');

        if (e.defaultPrevented) return

        const actions = this._controllableSettle({
          nudges: e.detail.nudges,
          time: performance.now(),
          axis: this.type,
        })
        this._processControllerActions(actions)
      })
    }

    private _controllableSettle({
      nudges = [],
      time = performance.now(),
      axis,
    }: {
      nudges: Nudge[]
      time?: number
      axis: 'horizontal' | 'vertical'
    }): ControllableCoreMixinAction[] {
      // console.log('settle')

      const actions: ControllableCoreMixinAction[] = []

      if (nudges.length <= 1) return actions

      const nudge1 = nudges[nudges.length - 2]
      const nudge2 = nudges[nudges.length - 1]
      // console.log(nudge1, nudge2)
      const interval = nudge2.time - nudge1.time
      const distance =
        axis === 'horizontal' ? nudge2.x + nudge1.x : nudge2.y + nudge1.y
      // console.log(distance)
      const velocity = distance / interval

      const momentumDistance = velocity * 40
      let newPosition =
        this._position[axis === 'horizontal' ? 'x' : 'y'] + momentumDistance
      // console.log(this.position, newPosition, this.itemsLength - this.length)
      if (newPosition > 0) newPosition = 0
      else if (newPosition < this._length(axis) - this._itemsLength(axis)) {
        newPosition = this._length(axis) - this._itemsLength(axis)
      }
      this._position[axis === 'horizontal' ? 'x' : 'y'] = newPosition
      // console.log(newPosition)

      this._controllerItems.forEach((item, index) => {
        actions.push({
          index,
          type: 'itemTranslate',
          x: axis === 'horizontal' ? this._position.x : 0,
          y: axis === 'vertical' ? this._position.y : 0,
          ease: `${300 + 'ms'} transform`,
        })
      })

      return actions
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    ControllableSettleMixinClass,
    typeof Base
  >
}
