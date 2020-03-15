import { ComposeConstructor } from "../types"
import Direction from  '../enums/direction'

import { getBounds } from "../helpers/get-bounds";
import ElementEventable from "./element-eventable";

export interface ElementableOptions {
  container: HTMLElement
  direction?: Direction
}

export interface Elementable {
  new(options: ElementableOptions): ElementableInstance
  elementable: boolean
}

export interface ElementableInstance {
  nudge: (offset: number, ease: boolean) => boolean
  settle: () => void
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

export default function Elementable<T extends new (o: any) => any>(Base: T) {
  const Base2 = ElementEventable(Base)

  // ensure elementable is not mixed in more than once
  if ((Base as any).elementable) return Base as ComposeConstructor<Elementable, typeof Base2>

  class Mixin extends (Base2 as new (...a: any[]) => any) implements ElementableInstance {
    static elementable = true

    #options: Required<ElementableOptions>
    #unsettledNudges: UnsettledNudge[] = []

    constructor({
      container,
      direction = Direction.HORIZONTAL,
      ...otherOptions
    }: ElementableOptions) {
      super({container, direction, ...otherOptions})

      this.#options = {container, direction}
    }

    get container() {
      return this.#options.container;
    }

    protected get direction() {
      return this.#options.direction
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
      const event = new CustomEvent<NudgeEventDetail>('yacc:elementable:nudge', {
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
      const event = new CustomEvent<SettleEventDetail>('yacc:elementable:settle', {
        detail: {
          ease,
          unsettledNudges: this.#unsettledNudges
        }
      });
      this._emit(event);

      this.#unsettledNudges = []
    }
  }
  
  return <unknown>Mixin as ComposeConstructor<Elementable, typeof Base2>
}

