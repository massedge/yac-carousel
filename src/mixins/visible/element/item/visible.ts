import { ComposeConstructor } from '../../../../types'
import { MixinInstance as EventableInstance } from '../../../eventable/types'

export interface VisibleOptions {}

export interface Visible {
  new (options: VisibleOptions): VisibleInstance
}

export interface VisibleInstance {
  visible: boolean
  on: <K extends keyof MixinEventMap>(
    type: K,
    listener: (ev: MixinEventMap[K]) => void
  ) => void
  off: <K extends keyof MixinEventMap>(
    type: K,
    listener: (ev: MixinEventMap[K]) => void
  ) => void
}

export interface VisibleBase extends Pick<EventableInstance, 'emitter'> {}

export interface VisibleEventDetail {
  visible: boolean
}

export interface MixinEventMap {
  'yac:item:visible': CustomEvent<VisibleEventDetail>
}

export default function VisibleContainerItem<
  T extends new (o: any) => VisibleBase
>(Base: T) {
  class Mixin extends (Base as new (options: VisibleOptions) => VisibleBase)
    implements VisibleInstance {
    #visible: boolean = false

    get visible() {
      return this.#visible
    }

    set visible(value: boolean) {
      this.#visible = value

      // trigger event
      const event: MixinEventMap['yac:item:visible'] = new CustomEvent(
        'yac:item:visible',
        {
          detail: {
            visible: this.#visible,
          },
        }
      )
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

  return (Mixin as unknown) as ComposeConstructor<Visible, typeof Base>
}
