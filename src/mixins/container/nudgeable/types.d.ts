import Nudge from '../../../classes/nudge'

export interface MixinOptions {}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {
  nudge: (
    nudge?: Nudge,
    options?: { ease?: boolean; settled?: boolean }
  ) => void
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
  'yacc:nudge': CustomEvent<NudgeEventDetail>
  'yacc:settle': CustomEvent<SettleEventDetail>
}

export interface MixinBase {
  on(type: string, listener: (evt: CustomEvent) => void): void
  off(type: string, listener: (evt: CustomEvent) => void): void
  _emit(evt: CustomEvent): void
}
