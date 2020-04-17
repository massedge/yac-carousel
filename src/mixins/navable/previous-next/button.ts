import { ComposeConstructor } from '../../../types'
import { IndexableSelectNextPreviousMixinInstance } from '../../indexable/select-next-previous'
import { IndexableCoreMixinInstance } from '../../indexable/core'

export interface NavablePreviousNextButtonOptions {
  previousText: string
  nextText: string
}

export interface NavablePreviousNextButton {
  new (
    options: NavablePreviousNextButtonOptions
  ): NavablePreviousNextButtonInstance
}

export interface NavablePreviousNextButtonInstance {
  render: () => void
  destroy: () => void
}

export interface NavablePreviousNextButtonBase
  extends Pick<
      IndexableSelectNextPreviousMixinInstance,
      'selectNext' | 'selectPrevious' | 'canSelectNext' | 'canSelectPrevious'
    >,
    Pick<IndexableCoreMixinInstance, 'on' | 'off'> {
  readonly element: HTMLElement
  render(): void
  destroy(): void
}

export default function NavablePreviousNextButton<
  T extends new (o: any) => NavablePreviousNextButtonBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: NavablePreviousNextButtonOptions
    ) => NavablePreviousNextButtonBase)
    implements NavablePreviousNextButtonInstance {
    #options: {
      elPrevious: HTMLButtonElement
      elNext: HTMLButtonElement
    }
    #nextFn: () => void
    #previousFn: () => void
    #stateUpdateHandler: () => void

    constructor({
      previousText,
      nextText,
      ...otherOptions
    }: NavablePreviousNextButtonOptions) {
      super({
        previousText,
        nextText,
        ...otherOptions,
      })

      this.#options = {
        elPrevious: Mixin.createButton('previous', previousText),
        elNext: Mixin.createButton('next', nextText),
      }

      this.#previousFn = () => this.selectPrevious()
      this.#nextFn = () => this.selectNext()

      this.#stateUpdateHandler = () =>
        this._navablePreviousNextButtonStateUpdate()
    }

    private _navablePreviousNextButtonStateUpdate() {
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

      this.element.parentNode?.insertBefore(
        this.#options.elNext,
        this.element.nextSibling
      )
      this.element.parentNode?.insertBefore(
        this.#options.elPrevious,
        this.element.nextSibling
      )

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

    private static createButton(cssClass: string, text: string) {
      const el = document.createElement('button')
      el.setAttribute('class', 'yac-carousel-navable ' + cssClass)
      el.setAttribute('type', 'button')
      el.appendChild(document.createTextNode(text))
      return el
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    NavablePreviousNextButton,
    typeof Base
  >
}
