import { IndexableSelectMixinInstance } from '../select'

export interface IndexableSelectNextPreviousMixinOptions {
  index?: number
}

export interface IndexableSelectNextPreviousMixinClass {
  new (
    options: IndexableSelectNextPreviousMixinOptions
  ): IndexableSelectNextPreviousMixinInstance
}

export interface IndexableSelectNextPreviousMixinInstance {
  /**
   * Check if previous item can be selected.
   * @returns Returns true if successful, false otherwise.
   */
  canSelectPrevious(): boolean

  /**
   * Attempt to select previous item.
   * @returns Returns true if successful, false otherwise.
   */
  selectPrevious(): boolean

  /**
   * Check if next item can be selected.
   * @returns Returns true if successful, false otherwise.
   */
  canSelectNext(): boolean

  /**
   * Attempt to select next item.
   * @returns Returns true if successful, false otherwise.
   */
  selectNext(): boolean
}

export interface IndexableSelectNextPreviousMixinBase
  extends Pick<
    IndexableSelectMixinInstance,
    'index' | 'canSelect' | 'select'
  > {}
