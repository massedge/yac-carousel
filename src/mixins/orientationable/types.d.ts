export type OrientationValue = 'horizontal' | 'vertical'
// | 'horizontal-and-vertical'

export interface OrientationableMixinOptions {
  orientation?: OrientationValue
}

export interface OrientationableMixinClass {
  new (options: OrientationableMixinOptions): OrientationableMixinInstance
}

export interface OrientationableMixinInstance {
  orientation: OrientationValue
}

export interface OrientationableMixinBase {
  refresh(): void
}
