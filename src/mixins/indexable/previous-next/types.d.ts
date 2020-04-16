import { IndexableSelectMixinInstance } from '../select'

export interface IndexablePreviousNextMixinOptions {
  index?: number
}

export interface IndexablePreviousNextMixinClass {
  new (
    options: IndexablePreviousNextMixinOptions
  ): IndexablePreviousNextMixinInstance
}

export interface IndexablePreviousNextMixinInstance {
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

export interface IndexablePreviousNextMixinBase
  extends Pick<
    IndexableSelectMixinInstance,
    'index' | 'canSelect' | 'select'
  > {}
