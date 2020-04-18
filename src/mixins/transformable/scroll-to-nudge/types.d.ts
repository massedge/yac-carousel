import Core from '../../../classes/core'
import { ElementableInstance } from '../../elementable/core'
import { NudgeableMixinInstance } from '../../nudgeable'

interface MixinOptions {}

interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

interface MixinInstance {}

interface MixinBase
  extends Core,
    Pick<ElementableInstance, 'element'>,
    Pick<NudgeableMixinInstance, 'nudge' | 'settle'> {}

export { MixinOptions, MixinClass, MixinInstance, MixinBase }
