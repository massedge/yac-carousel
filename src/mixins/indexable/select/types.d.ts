import { MixinInstance as EventableInstance } from '../../eventable/types'

export interface IndexableSelectMixinOptions {
  index?: number
}

export interface IndexableSelectMixinClass {
  new (options: IndexableSelectMixinOptions): IndexableSelectMixinInstance
}

export interface IndexableSelectMixinInstance {
  readonly index: number
  select(targetIndex: number): boolean
  on: <K extends keyof IndexableSelectMixinEventMap>(
    type: K,
    listener: (ev: IndexableSelectMixinEventMap[K]) => void
  ) => void
  off: <K extends keyof IndexableSelectMixinEventMap>(
    type: K,
    listener: (ev: IndexableSelectMixinEventMap[K]) => void
  ) => void
}

export interface IndexableSelectMixinEventMap {
  ['yac:select:before']: CustomEvent<
    IndexableSelectMixinSelectBeforeEventDetail
  >
  ['yac:select:after']: CustomEvent<IndexableSelectMixinSelectAfterEventDetail>
}

export interface IndexableSelectMixinBase<Item = any>
  extends Pick<EventableInstance, 'emitter'> {
  items: readonly Item[]
}

interface IndexableSelectMixinSelectBeforeEventDetail {
  readonly fromIndex: number
  readonly targetIndex: number
  toIndex: number
}

interface IndexableSelectMixinSelectAfterEventDetail
  extends IndexableSelectMixinSelectBeforeEventDetail {
  readonly toIndex: number
}
