import { ComposeConstructor } from '../../../types'

import {
  Align,
  Align2d,
  MixinBase,
  MixinClass,
  MixinInstance,
  MixinOptions,
} from './types'

export default function AlignableCoreMixin<T extends new (o: any) => MixinBase>(
  Base: T
) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #auto: boolean
    #align: Align2d = ['start', 'start']

    constructor({ align, ...otherOptions }: MixinOptions) {
      super({ align, ...otherOptions })
      this.#auto = !align
      if (align) this.#align = this._alignableCoreNormalize(align)
    }

    render() {
      super.render()
      if (this.#auto) this.alignAutoUpdate()
    }

    refresh() {
      super.refresh()
      if (this.#auto) this.alignAutoUpdate()
    }

    get align() {
      return this.#align
    }

    set align(value) {
      this.#auto = false
      if (value === this.#align) return
      this.#align = value
      this.refresh()
    }

    alignAutoUpdate(defaultAlign?: Align | Align2d) {
      this.#auto = true

      if (defaultAlign)
        defaultAlign = this._alignableCoreNormalize(defaultAlign)

      if (
        defaultAlign &&
        (this.#align[0] !== defaultAlign[0] ||
          this.#align[1] !== defaultAlign[1])
      ) {
        this.#align = defaultAlign
        this.refresh()
      }

      return defaultAlign
    }

    _alignableCoreNormalize(align: Align | Align2d): Align2d {
      if (typeof align === 'string') {
        return [align, align]
      } else {
        return align
      }
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
