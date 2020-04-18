import { ComposeConstructor } from '../../types'
import Nudge from '../../classes/nudge'

import {
  NudgeableMixinBase,
  NudgeableMixinClass,
  NudgeableMixinEventMap,
  NudgeableMixinInstance,
  NudgeableMixinOptions,
} from './types'

export default function Nudgeable<T extends new (o: any) => NudgeableMixinBase>(
  Base: T
) {
  class Mixin
    extends (Base as new (options: NudgeableMixinOptions) => NudgeableMixinBase)
    implements NudgeableMixinInstance {
    #unsettledNudges: Nudge[] = []

    on<K extends keyof NudgeableMixinEventMap>(
      type: K,
      listener: (ev: NudgeableMixinEventMap[K]) => void
    ) {
      return this.emitter.on.call(this, type, listener)
    }

    off<K extends keyof NudgeableMixinEventMap>(
      type: K,
      listener: (ev: NudgeableMixinEventMap[K]) => void
    ) {
      return this.emitter.off.call(this, type, listener)
    }

    nudge(
      {
        nudge = new Nudge(),
        ease = false,
        settled = true,
      }: NonNullable<Parameters<NudgeableMixinInstance['nudge']>[0]> = {
        nudge: new Nudge(),
        ease: false,
        settled: true,
      }
    ) {
      if (!settled) {
        this.#unsettledNudges.push(nudge)
      }

      // trigger event
      const event: NudgeableMixinEventMap['yac:nudge'] = new CustomEvent(
        'yac:nudge',
        {
          cancelable: true,
          detail: {
            nudge,
            ease,
            settled,
          },
        }
      )
      this.emitter.emit(event)
    }

    settle(
      {
        ease = true,
      }: NonNullable<Parameters<NudgeableMixinInstance['settle']>[0]> = {
        ease: true,
      }
    ) {
      // trigger event
      const event: NudgeableMixinEventMap['yac:settle'] = new CustomEvent(
        'yac:settle',
        {
          detail: {
            ease,
            nudges: this.#unsettledNudges,
          },
        }
      )
      this.emitter.emit(event)

      this.#unsettledNudges = []
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    NudgeableMixinClass,
    typeof Base
  >
}
