import Core from '../../../classes/core'
import { ItemizableCoreMixinInstance } from '../core'
import { IndexableSelectMixinInstance } from '../../indexable/select'
import { MixinInstance as FocusableInstance } from '../../focusable/types'

export interface MixinOptions {}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {}

export interface MixinBase<Item extends MixinItemBase>
  extends Core,
    Pick<ItemizableCoreMixinInstance<Item>, 'items'>,
    Pick<IndexableSelectMixinInstance, 'select'> {}

export interface MixinItemBase
  extends Core,
    Pick<FocusableInstance, 'on' | 'off'> {}
