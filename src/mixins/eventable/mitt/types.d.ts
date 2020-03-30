import {
  MixinBase as BaseMixinBase,
  MixinClass as BaseMixinClass,
  MixinInstance as BaseMixinInstance,
  MixinOptions as BaseMixinOptions,
} from '../types'

export interface MixinOptions extends BaseMixinOptions {}

export interface MixinClass extends BaseMixinClass {
  new (options?: MixinOptions): MixinInstance
}

export interface MixinInstance extends BaseMixinInstance {}

export interface MixinBase extends BaseMixinBase {}
