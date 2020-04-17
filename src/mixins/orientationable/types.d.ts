export type OrientationValue = 'horizontal' | 'vertical'
// | 'horizontal-and-vertical'

export interface MixinOptions {
  orientation?: OrientationValue
}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {
  orientation: OrientationValue
}

export interface MixinBase {
  refresh(): void
}
