import {
  ControllableCoreMixinInstance,
  ControllableCoreMixinAction,
} from '../core'
import { NudgeableMixinInstance } from '../../nudgeable'
import { OrientationableMixinInstance } from '../../orientationable'
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
    Pick<NudgeableMixinInstance, 'on' | 'off'>,
    Pick<OrientationableMixinInstance, 'orientation'> {
  render(): void
}
