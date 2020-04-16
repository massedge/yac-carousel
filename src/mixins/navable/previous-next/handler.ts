import { ComposeConstructor } from '../../../types'
import { IndexableSelectNextPreviousMixinInstance } from '../../indexable/select-next-previous'

export interface NavablePreviousNextHandlerOptions {
  elPrevious: HTMLElement
  elNext: HTMLElement
}

export interface NavablePreviousNextHandler {
  new (
    options: NavablePreviousNextHandlerOptions
  ): NavablePreviousNextHandlerInstance
}

export interface NavablePreviousNextHandlerInstance {
  render: () => void
  destroy: () => void
}

export interface NavablePreviousNextHandlerBase
  extends Pick<
    IndexableSelectNextPreviousMixinInstance,
    'selectNext' | 'selectPrevious'
  > {
  render(): void
  destroy(): void
}

export default function NavablePreviousNextHandler<
  T extends new (o: any) => NavablePreviousNextHandlerBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: NavablePreviousNextHandlerOptions
    ) => NavablePreviousNextHandlerBase)
    implements NavablePreviousNextHandlerInstance {
    #options: NavablePreviousNextHandlerOptions
    #nextFn: () => void
    #previousFn: () => void

    constructor({
      elPrevious,
      elNext,
      ...otherOptions
    }: NavablePreviousNextHandlerOptions) {
      super({
        elPrevious,
        elNext,
        ...otherOptions,
      })

      this.#options = {
        elPrevious,
        elNext,
      }

      this.#previousFn = () => this.selectPrevious()
      this.#nextFn = () => this.selectNext()
    }

    render() {
      super.render()

      this.#options.elPrevious.addEventListener(
        'click',
        this.#previousFn,
        false
      )
      this.#options.elNext.addEventListener('click', this.#nextFn, false)
    }

    destroy() {
      super.destroy()
      this.#options.elPrevious.removeEventListener(
        'click',
        this.#previousFn,
        false
      )
      this.#options.elNext.removeEventListener('click', this.#nextFn, false)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    NavablePreviousNextHandler,
    typeof Base
  >
}
