import { MixinInstance as EventableInstance } from '../../eventable/types'

export type Direction = 'ltr' | 'rtl' | 'auto'

export interface MixinOptions {
  direction?: Direction
}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {
  direction: Direction
  readonly computedDirection: Exclude<Direction, 'auto'>

  on: <K extends keyof MixinEventMap>(
    type: K,
    listener: (ev: MixinEventMap[K]) => void
  ) => void
  off: <K extends keyof MixinEventMap>(
    type: K,
    listener: (ev: MixinEventMap[K]) => void
  ) => void
}

export interface MixinBase extends Pick<EventableInstance, 'emitter'> {
  render(): void
  refresh(): void
  readonly rendered: boolean
}

export interface MixinEventMap {
  ['yac:computed-direction:compute-auto']: CustomEvent<
    ComputedDirectionComputeAutoEventDetail
  >
}

interface ComputedDirectionComputeAutoEventDetail {
  computedDirection: MixinInstance['computedDirection']
}
