import { ComposeConstructor } from '../../../types'
import { IndexableSelectNextPreviousMixinInstance } from '../../indexable/select-next-previous'
import { IndexableCoreMixinInstance } from '../../indexable/core'

export interface NavablePreviousNextHandlerOptions {
  elPrevious: HTMLButtonElement
  elNext: HTMLButtonElement
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
      'selectNext' | 'selectPrevious' | 'canSelectNext' | 'canSelectPrevious'
    >,
    Pick<IndexableCoreMixinInstance, 'on' | 'off'> {
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
    #stateUpdateHandler: () => void

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

      this.#stateUpdateHandler = () =>
        this._navablePreviousNextHandlerStateUpdate()
    }

    private _navablePreviousNextHandlerStateUpdate() {
      this.#options.elNext.setAttribute(
        'aria-disabled',
        this.canSelectNext() ? 'false' : 'true'
      )
      this.#options.elPrevious.setAttribute(
        'aria-disabled',
        this.canSelectPrevious() ? 'false' : 'true'
      )
    }

    render() {
      super.render()

      this.#options.elPrevious.addEventListener(
        'click',
        this.#previousFn,
        false
      )
      this.#options.elNext.addEventListener('click', this.#nextFn, false)

      this.#stateUpdateHandler()
      this.on('yac:select:after', this.#stateUpdateHandler)
    }

    destroy() {
      super.destroy()
      this.#options.elPrevious.removeEventListener(
        'click',
        this.#previousFn,
        false
      )
      this.#options.elNext.removeEventListener('click', this.#nextFn, false)
      this.off('yac:select:after', this.#stateUpdateHandler)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    NavablePreviousNextHandler,
    typeof Base
  >
}
