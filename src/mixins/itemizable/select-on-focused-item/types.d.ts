import Core from '../../../classes/core'
import { MixinInstance as ItemizableCoreInstance } from '../core/types'
import { IndexableSelectMixinInstance } from '../../indexable/select'
import { MixinInstance as FocusableInstance } from '../../focusable/types'

export interface MixinOptions {}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {}

export interface MixinBase<Item extends MixinItemBase>
  extends Core,
    Pick<ItemizableCoreInstance<Item>, 'items'>,
    Pick<IndexableSelectMixinInstance, 'select'> {}

export interface MixinItemBase
  extends Core,
    Pick<FocusableInstance, 'on' | 'off'> {}
