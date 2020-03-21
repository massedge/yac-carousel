import { ComposeConstructor } from '../types'

export interface VisibleOptions {}

export interface Visible {
  new (options: VisibleOptions): VisibleInstance
}

export interface VisibleInstance {
  visible: boolean
}

export interface VisibleBase {
  _emit(evt: CustomEvent): void
}

export interface VisibleEventDetail {
  visible: boolean
}

export default function Visible<T extends new (o: any) => VisibleBase>(
  Base: T
) {
  class Mixin extends (Base as new (options: VisibleOptions) => VisibleBase)
    implements VisibleInstance {
    #visible: boolean = false

    get visible() {
      return this.#visible
    }

    set visible(value: boolean) {
      this.#visible = value

      // trigger event
      const event = new CustomEvent<VisibleEventDetail>('yacc:item:visible', {
        detail: {
          visible: this.#visible,
        },
      })
      this._emit(event)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<Visible, typeof Base>
}
