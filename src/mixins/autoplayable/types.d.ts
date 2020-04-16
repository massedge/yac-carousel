import Core from '../../classes/core'
import { IndexableCoreMixinInstance } from '../indexable/core'

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
    Pick<IndexableCoreMixinInstance, 'index' | 'select'> {
  items: readonly any[]
}
