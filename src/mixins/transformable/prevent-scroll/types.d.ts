import Core from '../../../classes/core'
import { ElementableInstance } from '../../elementable/core'

interface MixinOptions {}

interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

interface MixinInstance {}

interface MixinBase extends Core, Pick<ElementableInstance, 'element'> {}

export { MixinOptions, MixinClass, MixinInstance, MixinBase }
