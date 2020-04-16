import { ComposeConstructor } from '../../../types'
import mod from '../../../utils/mod'
import { ItemizableCoreMixinItemBase } from '../../itemizable/core'
import { IndexableCoreMixinEventMap } from '../../indexable/core'

import {
  ControllableLoopMixinBase,
  ControllableLoopMixinClass,
  ControllableLoopMixinInstance,
  ControllableLoopMixinOptions,
} from './types'

export default function ControllableLoopMixin<
  T extends new (o: any) => ControllableLoopMixinBase<Item>,
  Item extends ItemizableCoreMixinItemBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: ControllableLoopMixinOptions
    ) => ControllableLoopMixinBase<Item>)
    implements ControllableLoopMixinInstance {
    #loop: boolean
    #selectBeforeHandler: (
      e: IndexableCoreMixinEventMap['yac:select:before']
    ) => void

    get loop() {
      return this.#loop
    }
    set loop(value) {
      this.#loop = value
    }

    constructor({
      loop = false,
      ...otherOptions
    }: ControllableLoopMixinOptions) {
      super({ loop, ...otherOptions })
      this.#loop = loop

      this.#selectBeforeHandler = (e) => {
        if (e.defaultPrevented) return
        e.detail.toIndex = mod(e.detail.targetIndex, this.items.length)
      }
    }

    render() {
      super.render()
      this.on('yac:select:before', this.#selectBeforeHandler)
    }

    destroy() {
      super.destroy()
      this.off('yac:select:before', this.#selectBeforeHandler)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    ControllableLoopMixinClass,
    typeof Base
  >
}
