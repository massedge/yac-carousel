export type Align = 'start' | 'center' | 'end'
export type Align2d = [Align, Align]

export interface MixinOptions {
  align?: Align | Align2d
}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {
  align: Align2d
  alignAutoUpdate(defaultAlign?: Align | Align2d): Align2d | undefined
  _alignableCoreNormalize(align: Align | Align2d): Align2d
}

export interface MixinBase {
  render(): void
  refresh(): void
}
