import { ComposeConstructor } from '../../../types'

import {
  CssTransitionBase,
  CssTransitionInstance,
  CssTransitionMixin,
  CssTransitionOptions,
} from './types'

// @see https://www.w3schools.com/cssref/css3_pr_transition.asp
const TRANSITION_DEFAULT_VALUE = 'all 0s ease 0s'

export default function CssTransition<
  T extends new (o: any) => CssTransitionBase
>(Base: T) {
  class Mixin
    extends (Base as new (options: CssTransitionOptions) => CssTransitionBase)
    implements CssTransitionInstance {
    #transition: string

    constructor({
      transition = TRANSITION_DEFAULT_VALUE,
      ...otherOptions
    }: CssTransitionOptions) {
      super({
        transition,
        ...otherOptions,
      })

      this.#transition = transition
    }

    get transition() {
      return this.#transition
    }
    set transition(value: string) {
      this.#transition = value
      this._cssTransitionUpdateStyle()
    }

    render() {
      super.render()
      this._cssTransitionUpdateStyle()
    }

    private _cssTransitionUpdateStyle() {
      this.element.style.transition =
        this.transition || TRANSITION_DEFAULT_VALUE
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    CssTransitionMixin,
    typeof Base
  >
}
