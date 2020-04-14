import { ComposeConstructor } from '../types'
import { MixinInstance as EventableInstance } from './eventable/types'

export interface ActiveOptions {}

export interface Active {
  new (options: ActiveOptions): ActiveInstance
}

export interface ActiveInstance {
  active: boolean
  on: <K extends keyof MixinEventMap>(
    type: K,
    listener: (ev: MixinEventMap[K]) => void
  ) => void
  off: <K extends keyof MixinEventMap>(
    type: K,
    listener: (ev: MixinEventMap[K]) => void
  ) => void
}

export interface ActiveBase extends Pick<EventableInstance, 'emitter'> {}

export interface ActiveEventDetail {
  active: boolean
}

export interface MixinEventMap {
  'yac:active': CustomEvent<ActiveEventDetail>
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
      const event: MixinEventMap['yac:active'] = new CustomEvent('yac:active', {
        detail: {
          active: this.#active,
        },
      })
      this.emitter.emit(event)
    }

    on<K extends keyof MixinEventMap>(
      type: K,
      listener: (ev: MixinEventMap[K]) => void
    ) {
      return this.emitter.on.call(this, type, listener)
    }

    off<K extends keyof MixinEventMap>(
      type: K,
      listener: (ev: MixinEventMap[K]) => void
    ) {
      return this.emitter.off.call(this, type, listener)
    }
  }

  return (Mixin as unknown) as ComposeConstructor<Active, typeof Base>
}
