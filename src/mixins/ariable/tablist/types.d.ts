import { ElementableInstance } from '../../elementable/core'
import { OrientationValue } from '../../orientationable/types'

export interface AriableTablistMixinOptions {}

export interface AriableTablistMixinClass {
  new (options: AriableTablistMixinOptions): AriableTablistMixinInstance
}

export interface AriableTablistMixinInstance {}

export interface AriableTablistMixinBase
  extends Pick<ElementableInstance, 'element'> {
  orientation?: OrientationValue
  render(): void
  destroy(): void
}
