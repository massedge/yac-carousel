import Nudge from '../../../classes/nudge'
import Core from '../../../classes/core'
import {
  ItemizableCoreInstance,
  ItemizableItemBase,
} from '../itemizable/core/types'
import { IndexableSelectInstance } from '../indexable/select/types'

export interface AutoplayOptions {
  enabled: boolean
  paused: boolean
  speed: number
  loop: boolean
}

export interface MixinOptions {
  autoplay?: Partial<AutoplayOptions>
}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {
  autoplayEnabled: boolean
  autoplayPaused: boolean
  autoplaySpeed: number
  autoplayLoop: boolean
}

export interface MixinBase
  extends Core,
    Pick<ItemizableCoreInstance<ItemizableItemBase>, 'items'>,
    Pick<IndexableSelectInstance, 'index' | 'select'> {}
