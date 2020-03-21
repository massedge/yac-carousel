import { ComposeConstructor } from "../../../types"
import {
  IndexablePreviousNextMixin,
  IndexablePreviousNextBase,
  IndexablePreviousNextOptions,
  IndexablePreviousNextInstance,
} from './types'

export const SELECT_BEFORE_EVENT = 'yacc:select:before'
export const SELECT_AFTER_EVENT = 'yacc:select:after'

export default function IndexablePreviousNext<T extends new (o: any) => IndexablePreviousNextBase>(Base: T) {
  class Mixin extends (Base as new (options: IndexablePreviousNextOptions) => IndexablePreviousNextBase) implements IndexablePreviousNextInstance {
    previous() {
      return this.select(this.index - 1);
    }

    next() {
      return this.select(this.index + 1);
    }
  }
  
  return Mixin as unknown as ComposeConstructor<IndexablePreviousNextMixin, typeof Base>
}
