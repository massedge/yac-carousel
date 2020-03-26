import { ComposeConstructor } from '../../../../types'

import {
  CssTransformableTranslateBase,
  CssTransformableTranslateInstance,
  CssTransformableTranslateMixin,
  CssTransformableTranslateOptions,
} from './types'

export default function CssTransformableTranslate<
  T extends new (o: any) => CssTransformableTranslateBase
>(Base: T) {
  class Mixin
    extends (Base as new (
      options: CssTransformableTranslateOptions
    ) => CssTransformableTranslateBase)
    implements CssTransformableTranslateInstance {
    #translateX: number
    #translateY: number

    constructor({
      translateX = 0,
      translateY = 0,
      ...otherOptions
    }: CssTransformableTranslateOptions) {
      super({
        translateX,
        translateY,
        ...otherOptions,
      })

      this.#translateX = translateX
      this.#translateY = translateY
    }

    get translateX() {
      return this.#translateX
    }
    set translateX(value) {
      this.#translateX = value
      this._cssTransformTranslateUpdateStyle()
    }

    get translateY() {
      return this.#translateY
    }
    set translateY(value) {
      this.#translateY = value
      this._cssTransformTranslateUpdateStyle()
    }

    render() {
      super.render()
      this._cssTransformTranslateUpdateStyle()
    }

    private _cssTransformTranslateUpdateStyle() {
      this.element.style.transform = `translate(${this.translateX + 'px'},${
        this.translateY + 'px'
      })`
    }
  }

  return (Mixin as unknown) as ComposeConstructor<
    CssTransformableTranslateMixin,
    typeof Base
  >
}
