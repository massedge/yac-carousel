import { ComposeConstructor } from '../../../types'
import {
  IndexablePreviousNextMixin,
  IndexablePreviousNextBase,
  IndexablePreviousNextOptions,
  IndexablePreviousNextInstance,
} from './types'

export const SELECT_BEFORE_EVENT = 'yac:select:before'
export const SELECT_AFTER_EVENT = 'yac:select:after'

export default function IndexablePreviousNext<
  T extends new (o: any) => IndexablePreviousNextBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: IndexablePreviousNextOptions
    ) => IndexablePreviousNextBase)
    implements IndexablePreviousNextInstance {
    canPrevious() {
      return this.canSelect(this.index - 1) !== false
    }
    previous() {
      return this.select(this.index - 1)
    }

    canNext() {
      return this.canSelect(this.index + 1) !== false
    }
    next() {
      return this.select(this.index + 1)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    IndexablePreviousNextMixin,
    typeof Base
  >
}
