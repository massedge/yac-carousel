import { IndexableSelectMixinInstance } from '../select'

export interface IndexablePreviousNextOptions {
  index?: number
}

export interface IndexablePreviousNextMixin {
  new (options: IndexablePreviousNextOptions): IndexablePreviousNextInstance
}

export interface IndexablePreviousNextInstance {
  /**
   * Check if previous item can be selected.
   * @returns Returns true if successful, false otherwise.
   */
  canPrevious(): boolean

  /**
   * Attempt to select previous item.
   * @returns Returns true if successful, false otherwise.
   */
  previous(): boolean

  /**
   * Check if next item can be selected.
   * @returns Returns true if successful, false otherwise.
   */
  canNext(): boolean

  /**
   * Attempt to select next item.
   * @returns Returns true if successful, false otherwise.
   */
  next(): boolean
}

export interface IndexablePreviousNextBase
  extends Pick<
    IndexableSelectMixinInstance,
    'index' | 'canSelect' | 'select'
  > {}
