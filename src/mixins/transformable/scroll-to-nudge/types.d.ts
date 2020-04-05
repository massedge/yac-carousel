import Core from '../../../classes/core'
import { ElementableInstance } from '../../elementable/core'
import { MixinInstance as NudgeableInstance } from '../../nudgeable/types'

interface MixinOptions {}

interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

interface MixinInstance {}

interface MixinBase
  extends Core,
    Pick<ElementableInstance, 'element'>,
    Pick<NudgeableInstance, 'nudge' | 'settle'> {}

export { MixinOptions, MixinClass, MixinInstance, MixinBase }
