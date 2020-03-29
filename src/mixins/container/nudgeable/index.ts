import { ComposeConstructor } from '../../../types'
import Nudge from '../../../classes/nudge'

import {
  MixinBase,
  MixinClass,
  MixinEventMap,
  MixinInstance,
  MixinOptions,
  NudgeEventDetail,
  SettleEventDetail,
} from './types'

export const NUDGE_EVENT = 'yacc:nudgeable:nudge'
export const SETTLE_EVENT = 'yacc:nudgeable:settle'

export default function NudgeableMixin<T extends new (o: any) => MixinBase>(
  Base: T
) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #unsettledNudges: Nudge[] = []

    on<K extends keyof MixinEventMap>(
      type: K,
      listener: (ev: MixinEventMap[K]) => void
    ) {
      return super.on.call(this, type, listener)
    }

    off<K extends keyof MixinEventMap>(
      type: K,
      listener: (ev: MixinEventMap[K]) => void
    ) {
      return super.off.call(this, type, listener)
    }

    /**
     * @return returns true if nudge resulted in shifting of items, false otherwise.
     */
    nudge(
      nudge = new Nudge(),
      { ease = false }: NonNullable<Parameters<MixinInstance['nudge']>[1]> = {
        ease: false,
      }
    ) {
      this.#unsettledNudges.push(nudge)

      // trigger event
      const event = new CustomEvent<NudgeEventDetail>(NUDGE_EVENT, {
        cancelable: true,
        detail: {
          nudge,
          ease,
        },
      })
      this._emit(event)
    }

    settle(
      { ease = true }: NonNullable<Parameters<MixinInstance['settle']>[0]> = {
        ease: true,
      }
    ) {
      // trigger event
      const event = new CustomEvent<SettleEventDetail>(SETTLE_EVENT, {
        detail: {
          ease,
          unsettledNudges: this.#unsettledNudges,
        },
      })
      this._emit(event)

      this.#unsettledNudges = []
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
