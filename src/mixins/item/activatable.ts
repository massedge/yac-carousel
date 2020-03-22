import { ComposeConstructor } from '../../types'

export interface ActiveOptions {}

export interface Active {
  new (options: ActiveOptions): ActiveInstance
}

export interface ActiveInstance {
  active: boolean
}

export interface ActiveBase {
  _emit(evt: CustomEvent): void
}

export interface ActiveEventDetail {
  active: boolean
}

export default function Active<T extends new (o: any) => ActiveBase>(Base: T) {
  class Mixin extends (Base as new (options: ActiveOptions) => ActiveBase)
    implements ActiveInstance {
    #active: boolean = false

    get active() {
      return this.#active
    }

    set active(value: boolean) {
      this.#active = value

      // trigger event
      const event = new CustomEvent<ActiveEventDetail>('yacc:item:active', {
        detail: {
          active: this.#active,
        },
      })
      this._emit(event)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<Active, typeof Base>
}
