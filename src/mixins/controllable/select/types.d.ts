import { ControllableCoreMixinInstance } from '../core'
import { ControllableNudgeMixinInstance } from '../nudge'
import { IndexableCoreMixinInstance } from '../../indexable/core'
import { ItemizableCoreMixinInstance } from '../../itemizable/core'
import { ActivatableMixinInstance } from '../../activatable'
import { MixinInstance as TypeableInstance } from '../../typeable/horizontal-vertical/types'
import Core from '../../../classes/core'

export interface ControllableSelectMixinOptions {}

export interface ControllableSelectMixinClass {
  new (options: ControllableSelectMixinOptions): ControllableSelectMixinInstance
}

export interface ControllableSelectMixinInstance {}

export interface ControllableSelectMixinBase<
  Item extends ControllableSelectMixinItemBase
>
  extends Pick<ItemizableCoreMixinInstance<Item>, 'items'>,
    Pick<
      ControllableCoreMixinInstance,
      | '_processControllerActions'
      | '_position'
      | '_length'
      | '_itemsLength'
      | '_controllerItems'
    >,
    Pick<ControllableNudgeMixinInstance, '_controllableNudge'>,
    Pick<IndexableCoreMixinInstance, 'on' | 'off'>,
    Pick<TypeableInstance, 'type'> {
  render(): void
}

export interface ControllableSelectMixinItemBase
  extends Core,
    Pick<ActivatableMixinInstance, 'active'> {}
