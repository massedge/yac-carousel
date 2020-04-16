import { ComposeConstructor } from '../../../types'
import {
  IndexablePreviousNextMixinBase,
  IndexablePreviousNextMixinClass,
  IndexablePreviousNextMixinOptions,
  IndexablePreviousNextMixinInstance,
} from './types'

export default function IndexablePreviousNextMixin<
  T extends new (o: any) => IndexablePreviousNextMixinBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: IndexablePreviousNextMixinOptions
    ) => IndexablePreviousNextMixinBase)
    implements IndexablePreviousNextMixinInstance {
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
    IndexablePreviousNextMixinClass,
    typeof Base
  >
}
