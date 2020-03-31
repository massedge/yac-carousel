import Core from '../../../classes/core'

interface MixinOptions {}

interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

interface MixinInstance {
  render(): void
  destroy(): void
}

interface MixinBase extends Core {}

export { MixinOptions, MixinClass, MixinInstance, MixinBase }
