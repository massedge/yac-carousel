import { DirectionableCoreMixinInstance } from '../core'
import { ElementableInstance } from '../../elementable/core'

export interface DirectionableElementMixinOptions {}

export interface DirectionableElementMixinClass {
  new (
    options: DirectionableElementMixinOptions
  ): DirectionableElementMixinInstance
}

export interface DirectionableElementMixinInstance {}

export interface DirectionableElementMixinBase
  extends Pick<
      DirectionableCoreMixinInstance,
      'direction' | 'computedDirection' | 'on' | 'off'
    >,
    Pick<ElementableInstance, 'element'> {
  render(): void
  refresh(): void
  destroy(): void
}
