export interface BoxModelableMixinOptions {}

export interface BoxModelableMixinClass {
  new (options: BoxModelableMixinOptions): BoxModelableMixinInstance
}

export interface BoxModelableMixinInstance {
  readonly width: number
  readonly height: number
}

export interface BoxModelableMixinBase {
  readonly element: HTMLElement
  render(): void
  refresh(): void
}
