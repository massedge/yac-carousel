import Nudge from '../../classes/nudge'
import { MixinInstance as EventableInstance } from '../eventable/types'

export interface MixinOptions {}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {
  /**
   * @return Returns true if nudge resulted in shifting of items, false otherwise.
   */
  nudge: (options?: {
    nudge?: Nudge
    ease?: boolean
    settled?: boolean
  }) => void
  settle: (options?: { ease?: boolean }) => void
  on: <K extends keyof MixinEventMap>(
    type: K,
    listener: (ev: MixinEventMap[K]) => void
  ) => void
  off: <K extends keyof MixinEventMap>(
    type: K,
    listener: (ev: MixinEventMap[K]) => void
  ) => void
}

export interface NudgeEventDetail {
  readonly nudge: Nudge
  readonly settled: boolean
  readonly ease: boolean
}

export interface SettleEventDetail {
  readonly ease: boolean
  readonly nudges: Nudge[]
}

export interface MixinEventMap {
  'yac:nudge': CustomEvent<NudgeEventDetail>
  'yac:settle': CustomEvent<SettleEventDetail>
}

export interface MixinBase extends Pick<EventableInstance, 'emitter'> {}
