import { ElementableInstance } from '../../elementable/core'
import { HorizontalVerticalValue } from '../../typeable/horizontal-vertical/types'

export interface AriableTablistMixinOptions {}

export interface AriableTablistMixinClass {
  new (options: AriableTablistMixinOptions): AriableTablistMixinInstance
}

export interface AriableTablistMixinInstance {}

export interface AriableTablistMixinBase
  extends Pick<ElementableInstance, 'element'> {
  type?: HorizontalVerticalValue
  render(): void
  destroy(): void
}
