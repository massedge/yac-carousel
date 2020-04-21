import { DraggableCoreMixinInstance } from '../core'

export interface MixinOptions {}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {}

export interface MixinBase
  extends Pick<DraggableCoreMixinInstance, 'on' | 'off'> {
  render(): void
  destroy(): void
}
