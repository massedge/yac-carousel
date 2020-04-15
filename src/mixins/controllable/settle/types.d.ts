import {
  ControllableCoreMixinInstance,
  ControllableCoreMixinAction,
} from '../core'
import { MixinInstance as NudgeableInstance } from '../../nudgeable/types'
import { MixinInstance as TypeableInstance } from '../../typeable/horizontal-vertical/types'
import Nudge from '../../../classes/nudge'

export interface ControllableSettleMixinOptions {}

export interface ControllableSettleMixinClass {
  new (options: ControllableSettleMixinOptions): ControllableSettleMixinInstance
}

export interface ControllableSettleMixinInstance {}

export interface ControllableSettleMixinBase
  extends Pick<
      ControllableCoreMixinInstance,
      | '_processControllerActions'
      | '_position'
      | '_length'
      | '_itemsLength'
      | '_controllerItems'
    >,
    Pick<NudgeableInstance, 'on' | 'off'>,
    Pick<TypeableInstance, 'type'> {
  render(): void
}
