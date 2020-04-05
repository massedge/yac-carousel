import Nudge from '../../classes/nudge'
import Core from '../../classes/core'
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
    Pick<IndexableSelectInstance, 'index' | 'select'> {
  items: readonly any[]
}
