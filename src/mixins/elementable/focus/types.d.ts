import Core from '../../../classes/core'
import { ElementableInstance } from '../core'
import { MixinInstance as FocusableInstance } from '../../focusable/types'

interface MixinOptions {}

interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

interface MixinInstance {}

interface MixinBase
  extends Core,
    Pick<ElementableInstance, 'element'>,
    Pick<FocusableInstance, 'focus' | 'blur' | 'on' | 'off'> {}

export { MixinOptions, MixinClass, MixinInstance, MixinBase }
