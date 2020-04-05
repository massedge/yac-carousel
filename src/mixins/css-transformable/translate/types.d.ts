export interface CssTransformableTranslateOptions {
  translateX?: number
  translateY?: number
}

export interface CssTransformableTranslateMixin {
  new (
    options: CssTransformableTranslateOptions
  ): CssTransformableTranslateInstance
}

export interface CssTransformableTranslateInstance {
  translateX: number
  translateY: number
}

export interface CssTransformableTranslateBase {
  readonly element: HTMLElement
  render(): void
  destroy(): void
}
