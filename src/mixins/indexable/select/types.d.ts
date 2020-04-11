export interface IndexableSelectOptions {
  index?: number
}

export interface IndexableSelectMixin {
  new (options: IndexableSelectOptions): IndexableSelectInstance
}

export interface IndexableSelectInstance {
  readonly index: number
  select(index: number): boolean
  on: <K extends keyof IndexableSelectEventMap>(
    type: K,
    listener: (ev: IndexableSelectEventMap[K]) => void
  ) => void
  off: <K extends keyof IndexableSelectEventMap>(
    type: K,
    listener: (ev: IndexableSelectEventMap[K]) => void
  ) => void
}

export interface IndexableSelectEventMap {
  ['yac:select:before']: CustomEvent<IndexableSelectEventDetail>
  ['yac:select:after']: CustomEvent<IndexableSelectEventDetail>
}

export interface IndexableSelectBase<Item = any> {
  items: readonly Item[]
  _on(type: string, listener: (evt: CustomEvent) => void): void
  off(type: string, listener: (evt: CustomEvent) => void): void
  _emit(evt: CustomEvent): void
}

export interface IndexableSelectEventDetail {
  from: number
  to: number
}
