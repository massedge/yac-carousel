import { MixinInstance as EventableInstance } from '../../eventable/types'

export interface IndexableSelectMixinOptions {
  index?: number
}

export interface IndexableSelectMixinClass {
  new (options: IndexableSelectMixinOptions): IndexableSelectMixinInstance
}

export interface IndexableSelectMixinInstance {
  readonly index: number

  /**
   * Check if the targetIndex can be selected.
   * @param targetIndex Index to be selected.
   * @returns Returns false when {targetIndex} cannot be selected, otherwise returns
   * the index that would be selected (not necessarily equal to the targetIndex).
   */
  canSelect(targetIndex: number): false | number

  /**
   * Attempt to select targetIndex.
   * @param targetIndex
   * @returns Returns true when successful, false otherwise.
   */
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
