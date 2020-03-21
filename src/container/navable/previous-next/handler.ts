import { ComposeConstructor } from '../../../types'

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

export interface NavablePreviousNextHandlerBase {
  render(): void
  destroy(): void
  next(): void
  previous(): void
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

      this.#previousFn = () => this.previous()
      this.#nextFn = () => this.next()
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
