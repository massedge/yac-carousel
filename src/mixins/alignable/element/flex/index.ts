import { ComposeConstructor } from '../../../../types'

import { Align, Align2d } from '../../core/types'

import { MixinBase, MixinClass, MixinInstance, MixinOptions } from './types'

const CSS_PROPERTIES = ['display', 'justify-content']

const ALIGN_TO_FLEX_MAP = {
  start: ['flex-start', 'normal'],
  center: ['center'],
  end: ['flex-end'],
}

const FLEX_TO_ALIGN_MAP: { [x: string]: Align } = {
  'flex-start': 'start',
  center: 'center',
  'flex-end': 'end',
}

export default function AlignableFlexElementMixin<
  T extends new (o: any) => MixinBase
>(Base: T) {
  class Mixin extends (Base as new (options: MixinOptions) => MixinBase)
    implements MixinInstance {
    #originalInlineStyles: {
      name: string
      value: string
      priority: string
    }[] = []

    render() {
      super.render()

      // store original styles
      CSS_PROPERTIES.forEach((property) => {
        this.#originalInlineStyles.push({
          name: property,
          value: this.element.style.getPropertyValue(property),
          priority: this.element.style.getPropertyPriority(property),
        })
      })

      this._alignableElementSetStyle()
    }

    refresh() {
      super.refresh()
      this._alignableElementSetStyle()
    }

    destroy() {
      this._alignableElementResetInlineStyles()
      this.destroy()
    }

    alignAutoUpdate(defaultAlign?: Align | Align2d) {
      if (defaultAlign)
        defaultAlign = this._alignableCoreNormalize(defaultAlign)
      this._alignableElementResetInlineStyles()

      const style = getComputedStyle(this.element)
      const display = style.display
      const justifyContent = style.justifyContent
      const flexDirection = style.flexDirection

      if (display === 'flex' || display === 'inline-flex') {
        const x =
          Object.keys(FLEX_TO_ALIGN_MAP).indexOf(justifyContent) > -1
            ? FLEX_TO_ALIGN_MAP[
                justifyContent as keyof typeof FLEX_TO_ALIGN_MAP
              ]
            : 'start'
        const y = 'start'

        defaultAlign = [x, y]

        if (flexDirection === 'column' || flexDirection === 'column-reverse') {
          defaultAlign = [defaultAlign[1], defaultAlign[0]]
        }
      }

      return super.alignAutoUpdate(defaultAlign)
    }

    private _alignableElementSetStyle() {
      CSS_PROPERTIES.forEach((property) =>
        this.element.style.removeProperty(property)
      )

      const style = getComputedStyle(this.element)
      const display = style.display
      const justifyContent = style.justifyContent
      const flexDirection = style.flexDirection

      if (display !== 'flex' && display !== 'inline-flex') {
        this.element.style.setProperty(
          'display',
          display.indexOf('inline') > -1 ? 'inline-flex' : 'flex',
          'important'
        )
      }

      let align = this.align
      if (flexDirection === 'column' || flexDirection === 'column-reverse') {
        align = [align[1], align[0]]
      }

      const x = ALIGN_TO_FLEX_MAP[align[0]]
      if (x.indexOf(justifyContent) <= -1) {
        this.element.style.setProperty('justify-content', x[0], 'important')
      }
    }

    private _alignableElementResetInlineStyles() {
      CSS_PROPERTIES.forEach((property) =>
        this.element.style.removeProperty(property)
      )

      this.#originalInlineStyles.forEach(({ name, value, priority }) => {
        this.element.style.setProperty(name, value, priority)
      })
    }
  }

  return (Mixin as unknown) as ComposeConstructor<MixinClass, typeof Base>
}
