import { ComposeConstructor } from '../../../types'
import Nudge from '../../../classes/nudge'

import {
  ControllableNudgeMixinBase,
  ControllableNudgeMixinClass,
  ControllableNudgeMixinInstance,
  ControllableNudgeMixinOptions,
} from './types'
import { ControllableCoreMixinAction } from '../core'

export default function ControllableNudgeMixin<
  T extends new (o: any) => ControllableNudgeMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: ControllableNudgeMixinOptions
    ) => ControllableNudgeMixinBase)
    implements ControllableNudgeMixinInstance {
    constructor({ ...otherOptions }: ControllableNudgeMixinOptions) {
      super({ ...otherOptions })
    }

    render() {
      super.render()

      this.on('yac:nudge', (e) => {
        // console.log('nudge');

        if (e.defaultPrevented) return

        const actions = this._controllableNudge({
          nudge: e.detail.nudge,
          ease: false,
          axis: this.orientation,
        })
        this._processControllerActions(actions)
      })
    }

    _controllableNudge({
      nudge,
      ease = false,
      axis,
    }: {
      nudge: Nudge
      axis: 'horizontal' | 'vertical'
      ease?: boolean
    }): ControllableCoreMixinAction[] {
      // console.log('nudge', nudge, ease, axis)

      const actions: ControllableCoreMixinAction[] = []
      let offset = axis === 'horizontal' ? nudge.x : nudge.y

      do {
        // console.log(this.position, offset, this.length, this.itemsLength)

        if (offset === 0) {
          // nothing moved
          break
        } else if (this._itemsLength(axis) <= this._length(axis)) {
          // length of all items is less than the length of the container
          break
        } else if (
          this._position[axis === 'horizontal' ? 'x' : 'y'] + offset >
          0
        ) {
          // ensure don't go beyond first item
          offset = 0 - this._position[axis === 'horizontal' ? 'x' : 'y']
          if (offset === 0) break
        } else if (
          this._position[axis === 'horizontal' ? 'x' : 'y'] + offset <
          this._length(axis) - this._itemsLength(axis)
        ) {
          // ensure don't go beyond last item
          offset =
            this._length(axis) -
            this._itemsLength(axis) -
            this._position[axis === 'horizontal' ? 'x' : 'y']
          if (offset === 0) break
        }

        this._position[axis === 'horizontal' ? 'x' : 'y'] += offset
        this._controllerItems.forEach((item, index) => {
          actions.push({
            index,
            type: 'itemTranslate',
            x: axis === 'horizontal' ? this._position.x : 0,
            y: axis === 'vertical' ? this._position.y : 0,
            ease: ease ? `${300 + 'ms'} transform` : '',
          })
        })
      } while (false)

      return actions
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    ControllableNudgeMixinClass,
    typeof Base
  >
}
