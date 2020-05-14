import { ElementableInstance } from '../../elementable/core'
import { OrientationableMixinInstance } from '..'

export interface OrientableTouchActionMixinOptions {}

export interface OrientableTouchActionMixinClass {
  new (
    options: OrientableTouchActionMixinOptions
  ): OrientableTouchActionMixinInstance
}

export interface OrientableTouchActionMixinInstance {}

export interface OrientableTouchActionMixinBase
  extends Pick<ElementableInstance, 'element'>,
    Pick<OrientationableMixinInstance, 'orientation'> {
  render(): void
  destroy(): void
}
