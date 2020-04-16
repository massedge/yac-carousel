import { ComposeConstructor } from '../../../types'
import {
  IndexableSelectNextPreviousMixinBase,
  IndexableSelectNextPreviousMixinClass,
  IndexableSelectNextPreviousMixinOptions,
  IndexableSelectNextPreviousMixinInstance,
} from './types'

export default function IndexableSelectNextPreviousMixin<
  T extends new (o: any) => IndexableSelectNextPreviousMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: IndexableSelectNextPreviousMixinOptions
    ) => IndexableSelectNextPreviousMixinBase)
    implements IndexableSelectNextPreviousMixinInstance {
    canSelectPrevious() {
      return this.canSelect(this.index - 1) !== false
    }
    selectPrevious() {
      return this.select(this.index - 1)
    }

    canSelectNext() {
      return this.canSelect(this.index + 1) !== false
    }
    selectNext() {
      return this.select(this.index + 1)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    IndexableSelectNextPreviousMixinClass,
    typeof Base
  >
}
