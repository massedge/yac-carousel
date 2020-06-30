import { DirectionableCoreMixinInstance } from '../core'
import { ElementableInstance } from '../../elementable/core'

export interface MixinOptions {}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {}

export interface MixinBase
  extends Pick<
      DirectionableCoreMixinInstance,
      'direction' | 'computedDirection' | 'on' | 'off'
    >,
    Pick<ElementableInstance, 'element'> {
  render(): void
  refresh(): void
  destroy(): void
}
