export interface CssTransitionOptions {
  transition?: string
}

export interface CssTransitionMixin {
  new (options: CssTransitionOptions): CssTransitionInstance
}

export interface CssTransitionInstance {
  transition: string
}

export interface CssTransitionBase {
  readonly element: HTMLElement
  render(): void
  destroy(): void
}
