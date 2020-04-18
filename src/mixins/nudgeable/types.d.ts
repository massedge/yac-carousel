import Nudge from '../../classes/nudge'
import { MixinInstance as EventableInstance } from '../eventable/types'

export interface NudgeableMixinOptions {}

export interface NudgeableMixinClass {
  new (options: NudgeableMixinOptions): NudgeableMixinInstance
}

export interface NudgeableMixinInstance {
  /**
   * @return Returns true if nudge resulted in shifting of items, false otherwise.
   */
  nudge: (options?: {
    nudge?: Nudge
    ease?: boolean
    settled?: boolean
  }) => void
  settle: (options?: { ease?: boolean }) => void
  on: <K extends keyof NudgeableMixinEventMap>(
    type: K,
    listener: (ev: NudgeableMixinEventMap[K]) => void
  ) => void
  off: <K extends keyof NudgeableMixinEventMap>(
    type: K,
    listener: (ev: NudgeableMixinEventMap[K]) => void
  ) => void
}

interface NudgeEventDetail {
  readonly nudge: Nudge
  readonly settled: boolean
  readonly ease: boolean
}

interface SettleEventDetail {
  readonly ease: boolean
  readonly nudges: Nudge[]
}

export interface NudgeableMixinEventMap {
  'yac:nudge': CustomEvent<NudgeEventDetail>
  'yac:settle': CustomEvent<SettleEventDetail>
}

export interface NudgeableMixinBase
  extends Pick<EventableInstance, 'emitter'> {}
