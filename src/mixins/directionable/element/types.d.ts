import {
  MixinInstance as DirectionableCoreInstance,
  Direction,
} from '../core/types'
import { ElementableInstance } from '../../elementable/core'

export interface MixinOptions {}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {}

export interface MixinBase
  extends Pick<DirectionableCoreInstance, 'direction'>,
    Pick<ElementableInstance, 'element'> {
  render(): void
  refresh(): void
  directionAutoUpdate(defaultDirection?: Direction): Direction | undefined
}
