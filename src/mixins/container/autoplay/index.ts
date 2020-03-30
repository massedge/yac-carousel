import { ComposeConstructor } from '../../../types'

import {
  AutoplayOptions,
  MixinBase,
  MixinClass,
  MixinInstance,
  MixinOptions,
} from './types'

const DEFAULT_AUTOPLAY_OPTIONS: AutoplayOptions = {
  enabled: false,
  loop: true,
  paused: false,
  speed: 3000,
}

export default function AutoplayMixin<T extends new (o: any) => MixinBase>(
  Base: T
) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #options: AutoplayOptions
    #timeout?: ReturnType<typeof setTimeout>

    constructor({
      autoplay = DEFAULT_AUTOPLAY_OPTIONS,
      ...otherOptions
    }: MixinOptions) {
      super({ autoplay, ...otherOptions })

      this.#options = {
        ...DEFAULT_AUTOPLAY_OPTIONS,
        ...autoplay,
      }
    }

    render() {
      super.render()
      this._autoplaySetTimer()
      // TODO: update when items added/removed
    }

    destroy() {
      this._autoplayClearTimer()
      super.destroy()
    }

    private _autoplaySetTimer() {
      if (!this.autoplayEnabled) {
        this._autoplayClearTimer()
        return
      }

      if (this.autoplayPaused) {
        this._autoplayClearTimer()
        return
      }

      if (!this._autoplayCanNext()) {
        this._autoplayClearTimer()
        return
      }

      // timer already running
      if (this.#timeout) return

      // set timer
      this.#timeout = setTimeout(() => {
        // clear timer
        this._autoplayClearTimer()

        // check if we can select next item
        if (!this._autoplayCanNext()) return

        // select next time
        this._autoplayNext()

        // set timer again
        this._autoplaySetTimer()
      }, this.autoplaySpeed)
    }

    private _autoplayClearTimer() {
      if (this.#timeout) {
        clearTimeout(this.#timeout)
        this.#timeout = undefined
      }
    }

    private _autoplayCanNext() {
      return this.#options.loop || this.index < this.items.length - 1
    }

    private _autoplayNext() {
      return this.select(this.index + 1)
    }

    get autoplayEnabled() {
      return this.#options.enabled
    }
    set autoplayEnabled(value) {
      this.#options.enabled = value
      this._autoplaySetTimer()
    }

    get autoplayLoop() {
      return this.#options.loop
    }
    set autoplayLoop(value) {
      this.#options.loop = value
      this._autoplaySetTimer()
    }

    get autoplayPaused() {
      return this.#options.paused
    }
    set autoplayPaused(value) {
      this.#options.paused = value
      this._autoplaySetTimer()
    }

    get autoplaySpeed() {
      return this.#options.speed
    }
    set autoplaySpeed(value) {
      this.#options.speed = value
      this._autoplayClearTimer()
      this._autoplaySetTimer()
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
