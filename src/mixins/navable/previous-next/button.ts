import { ComposeConstructor } from '../../../types'
import { IndexableSelectNextPreviousMixinInstance } from '../../indexable/select-next-previous'

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
    'selectNext' | 'selectPrevious'
  > {
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
      elPrevious: HTMLElement
      elNext: HTMLElement
    }
    #nextFn: () => void
    #previousFn: () => void

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
