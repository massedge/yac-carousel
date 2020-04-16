import { IndexableSelectMixinInstance } from '../../indexable/select'
import {
  ItemizableCoreMixinInstance,
  ItemizableCoreMixinItemBase,
} from '../../itemizable/core'

export interface ControllableLoopMixinOptions {
  loop?: boolean
}

export interface ControllableLoopMixinClass {
  new (options: ControllableLoopMixinOptions): ControllableLoopMixinInstance
}

export interface ControllableLoopMixinInstance {
  loop: boolean
}

export interface ControllableLoopMixinBase<
  Item extends ItemizableCoreMixinItemBase
>
  extends Pick<ItemizableCoreMixinInstance<Item>, 'items'>,
    Pick<IndexableSelectMixinInstance, 'on' | 'off'> {
  render(): void
  destroy(): void
}
