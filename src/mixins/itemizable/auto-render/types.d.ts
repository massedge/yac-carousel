import Core from '../../../classes/core'
import { ItemizableCoreMixinInstance } from '../core'

export interface MixinOptions {}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {}

export interface MixinBase<Item extends MixinItemBase>
  extends Core,
    Pick<ItemizableCoreMixinInstance<Item>, 'items'> {}

export interface MixinItemBase
  extends Pick<Core, 'rendered' | 'render' | 'destroy' | 'refresh'> {}
