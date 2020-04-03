export type Direction = 'ltr' | 'rtl'

export interface MixinOptions {
  direction?: Direction
}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {
  direction: Direction
  directionAutoUpdate(defaultDirection?: Direction): Direction | undefined
}

export interface MixinBase {
  render(): void
  refresh(): void
}
