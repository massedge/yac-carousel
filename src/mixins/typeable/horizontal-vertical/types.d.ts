export type HorizontalVerticalValue = 'horizontal' | 'vertical'
// | 'horizontal-and-vertical'

export interface MixinOptions {
  type?: HorizontalVerticalValue
}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {
  type: HorizontalVerticalValue
}

export interface MixinBase {
  refresh(): void
}
