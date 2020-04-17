import { ControllableCoreMixinInstance } from '../core'
import { MixinInstance as NudgeableInstance } from '../../nudgeable/types'
import { OrientationableMixinInstance } from '../../orientationable'

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
    Pick<OrientationableMixinInstance, 'orientation'> {
  render(): void
}
