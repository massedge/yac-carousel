import Nudge from '../../classes/nudge'

export interface MixinOptions {}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {
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

export interface MixinBase {
  _on(type: string, listener: (evt: CustomEvent) => void): void
  _off(type: string, listener: (evt: CustomEvent) => void): void
  _emit(evt: CustomEvent): void
}
