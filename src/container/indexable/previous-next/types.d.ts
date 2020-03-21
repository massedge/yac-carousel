export interface IndexablePreviousNextOptions {
  index?: number
}

export interface IndexablePreviousNextMixin {
  new(options: IndexablePreviousNextOptions): IndexablePreviousNextInstance
}

export interface IndexablePreviousNextInstance {
  previous(): boolean
  next(): boolean
}

export interface IndexablePreviousNextBase {
  readonly index: number
  select(index: number): boolean
}
