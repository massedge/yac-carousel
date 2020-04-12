import Core from '../../../classes/core'
import { MixinInstance as ItemizableCoreInstance } from '../core/types'

export interface MixinOptions {}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {}

export interface MixinBase<Item extends MixinItemBase>
  extends Core,
    Pick<ItemizableCoreInstance<Item>, 'items'> {}

export interface MixinItemBase
  extends Pick<Core, 'rendered' | 'render' | 'destroy' | 'refresh'> {}
