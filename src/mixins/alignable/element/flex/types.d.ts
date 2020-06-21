import {
  MixinInstance as AlignableCoreInstance,
  Align,
  Align2d,
} from '../../core/types'
import { ElementableInstance } from '../../../elementable/core'

export interface MixinOptions {}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {}

export interface MixinBase
  extends Pick<AlignableCoreInstance, 'align'>,
    Pick<ElementableInstance, 'element'> {
  render(): void
  refresh(): void
  destroy(): void
  alignAutoUpdate(defaultAlign?: Align | Align2d): Align2d | undefined
  _alignableCoreNormalize(align: Align | Align2d): Align2d
}
