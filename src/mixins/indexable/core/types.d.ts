import { MixinInstance as EventableInstance } from '../../eventable/types'

export interface IndexableCoreMixinOptions {
  index?: number
}

export interface IndexableCoreMixinClass {
  new (options: IndexableCoreMixinOptions): IndexableCoreMixinInstance
}

export interface IndexableCoreMixinInstance {
  readonly index: number

  /**
   * Check if the targetIndex can be selected.
   * @param targetIndex Index to be selected.
   * @returns Returns false when targetIndex cannot be selected, otherwise returns
   * the index that would be selected (not necessarily equal to the targetIndex).
   */
  canSelect(targetIndex: number): false | number

  /**
   * Attempt to select targetIndex.
   * @param targetIndex
   * @returns Returns true when successful, false otherwise.
   */
  select(targetIndex: number): boolean

  on: <K extends keyof IndexableCoreMixinEventMap>(
    type: K,
    listener: (ev: IndexableCoreMixinEventMap[K]) => void
  ) => void
  off: <K extends keyof IndexableCoreMixinEventMap>(
    type: K,
    listener: (ev: IndexableCoreMixinEventMap[K]) => void
  ) => void
}

export interface IndexableCoreMixinEventMap {
  ['yac:select:before']: CustomEvent<IndexableCoreMixinSelectBeforeEventDetail>
  ['yac:select:after']: CustomEvent<IndexableCoreMixinSelectAfterEventDetail>
}

export interface IndexableCoreMixinBase<Item = any>
  extends Pick<EventableInstance, 'emitter'> {
  items: readonly Item[]
}

interface IndexableCoreMixinSelectBeforeEventDetail {
  readonly fromIndex: number
  readonly targetIndex: number
  toIndex: number
}

interface IndexableCoreMixinSelectAfterEventDetail
  extends IndexableCoreMixinSelectBeforeEventDetail {
  readonly toIndex: number
}
