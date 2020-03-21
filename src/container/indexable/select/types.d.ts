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
  ['yacc:select:before']: CustomEvent<IndexableSelectEventDetail>
  ['yacc:select:after']: CustomEvent<IndexableSelectEventDetail>
}

export interface IndexableSelectBase<Item = any> {
  items: readonly Item[]
  on(type: string, listener: (evt: CustomEvent) => void): void
  off(type: string, listener: (evt: CustomEvent) => void): void
  _emit(evt: CustomEvent): void
}

export interface IndexableSelectEventDetail {
  from: number
  to: number
}
