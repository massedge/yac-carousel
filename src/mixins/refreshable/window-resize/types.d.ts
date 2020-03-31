import Core from '../../../classes/core'

interface MixinOptions {}

interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

interface MixinInstance {}

interface MixinBase extends Core {}

export { MixinOptions, MixinClass, MixinInstance, MixinBase }
