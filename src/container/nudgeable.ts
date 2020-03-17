import { ComposeConstructor } from "../types"

export interface NudgeableOptions {
}

export interface Nudgeable {
  new(options: NudgeableOptions): NudgeableInstance
  elementable: boolean
}

export interface NudgeableInstance {
  nudge: (offset: number, ease: boolean) => boolean
  settle: () => void
  on: <K extends keyof NudgeableEventMap>(type: K, listener: (ev: NudgeableEventMap[K]) => void) => void
  off: <K extends keyof NudgeableEventMap>(type: K, listener: (ev: NudgeableEventMap[K]) => void) => void
}

interface UnsettledNudge {
  offset: number
  time: number
}

export interface NudgeEventDetail {
  readonly offset: number
  readonly ease: boolean
  shifted: boolean
}

export interface SettleEventDetail {
  readonly ease: boolean
  readonly unsettledNudges: UnsettledNudge[]
}

export enum NudgeableEvent {
  NUDGE = 'yacc:nudgeable:nudge',
  SETTLE = 'yacc:nudgeable:settle',
}

export interface NudgeableEventMap {
  [NudgeableEvent.NUDGE]: CustomEvent<NudgeEventDetail>
  [NudgeableEvent.SETTLE]: CustomEvent<SettleEventDetail>
}

export default function Nudgeable<T extends new (o: any) => any>(Base: T) {
  class Mixin extends (Base as new (...a: any[]) => any) implements NudgeableInstance {
    static readonly nudgeable = true

    #unsettledNudges: UnsettledNudge[] = []

    on<K extends keyof NudgeableEventMap>(type: K, listener: (ev: NudgeableEventMap[K]) => void) {
      return super.on.apply(this, arguments)
    }
  
    off<K extends keyof NudgeableEventMap>(type: K, listener: (ev: NudgeableEventMap[K]) => void) {
      return super.off.apply(this, arguments)
    }

    /**
     * @return returns true if nudge resulted in shifting of items, false otherwise.
     */
    nudge(offset: number, ease: boolean = false): boolean {
      this.#unsettledNudges.push({
        offset,
        time: Date.now(),
      })

      // trigger event
      const event = new CustomEvent<NudgeEventDetail>(NudgeableEvent.NUDGE, {
        cancelable: true,
        detail: {
          offset,
          ease,
          shifted: false
        }
      });
      this._emit(event);

      return event.detail.shifted
    }
    
    settle(ease: boolean = true): void {
      // trigger event
      const event = new CustomEvent<SettleEventDetail>(NudgeableEvent.SETTLE, {
        detail: {
          ease,
          unsettledNudges: this.#unsettledNudges
        }
      });
      this._emit(event);

      this.#unsettledNudges = []
    }
  }
  
  return Mixin as unknown as ComposeConstructor<Nudgeable, typeof Base>
}

