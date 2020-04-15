import { ControllableCoreMixinInstance } from '../core'
import { ControllableNudgeMixinInstance } from '../nudge'
import { IndexableSelectInstance } from '../../indexable/select/types'
import { MixinInstance as ItemizableCoreInstance } from '../../itemizable/core/types'
import { ActiveInstance } from '../../activatable'
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
  extends Pick<ItemizableCoreInstance<Item>, 'items'>,
    Pick<
      ControllableCoreMixinInstance,
      | '_processControllerActions'
      | '_position'
      | '_length'
      | '_itemsLength'
      | '_controllerItems'
    >,
    Pick<ControllableNudgeMixinInstance, '_controllableNudge'>,
    Pick<IndexableSelectInstance, 'on' | 'off'>,
    Pick<TypeableInstance, 'type'> {
  render(): void
}

export interface ControllableSelectMixinItemBase
  extends Core,
    Pick<ActiveInstance, 'active'> {}
