import { ComposeConstructor } from '../../types'
import Nudge from '../../classes/nudge'

import {
  MixinBase,
  MixinClass,
  MixinEventMap,
  MixinInstance,
  MixinOptions,
} from './types'

export default function Nudgeable<T extends new (o: any) => MixinBase>(
  Base: T
) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #unsettledNudges: Nudge[] = []

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

    nudge(
      {
        nudge = new Nudge(),
        ease = false,
        settled = true,
      }: NonNullable<Parameters<MixinInstance['nudge']>[0]> = {
        nudge: new Nudge(),
        ease: false,
        settled: true,
      }
    ) {
      if (!settled) {
        this.#unsettledNudges.push(nudge)
      }

      // trigger event
      const event: MixinEventMap['yac:nudge'] = new CustomEvent('yac:nudge', {
        cancelable: true,
        detail: {
          nudge,
          ease,
          settled,
        },
      })
      this.emitter.emit(event)
    }

    settle(
      { ease = true }: NonNullable<Parameters<MixinInstance['settle']>[0]> = {
        ease: true,
      }
    ) {
      // trigger event
      const event: MixinEventMap['yac:settle'] = new CustomEvent('yac:settle', {
        detail: {
          ease,
          nudges: this.#unsettledNudges,
        },
      })
      this.emitter.emit(event)

      this.#unsettledNudges = []
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
