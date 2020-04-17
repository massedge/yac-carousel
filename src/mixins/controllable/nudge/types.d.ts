import {
  ControllableCoreMixinInstance,
  ControllableCoreMixinAction,
} from '../core'
import { MixinInstance as NudgeableInstance } from '../../nudgeable/types'
import { MixinInstance as OrientationableMixinInstance } from '../../orientationable/types'
import Nudge from '../../../classes/nudge'

export interface ControllableNudgeMixinOptions {}

export interface ControllableNudgeMixinClass {
  new (options: ControllableNudgeMixinOptions): ControllableNudgeMixinInstance
}

export interface ControllableNudgeMixinInstance {
  _controllableNudge(options: {
    nudge: Nudge
    axis: 'horizontal' | 'vertical'
    ease?: boolean
  }): ControllableCoreMixinAction[]
}

export interface ControllableNudgeMixinBase
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
