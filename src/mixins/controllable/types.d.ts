import Controller from '../../classes/controller'
import { MixinInstance as NudgeableInstance } from '../nudgeable/types'
import { IndexableSelectInstance } from '../indexable/select/types'
import Core from '../../classes/core'
import { ItemizableCoreInstance } from '../itemizable/core/types'
import { MixinInstance as TypeableInstance } from '../typeable/horizontal-vertical/types'
import { BoxModelableInstance } from '../box-modelable'
import { CssTransformableTranslateInstance } from '../css-transformable/translate/types'
import { CssTransitionInstance } from '../css-transitionable/types'
import { ActiveInstance } from '../activatable'
import { AlignableCoreInstance } from '../alignable/core'
import { DirectionableCoreMixinInstance } from '../directionable/core'

export interface MixinOptions<Item extends MixinItemBase> {
  controller: InstanceType<typeof Controller>
}

export interface MixinClass<Item extends MixinItemBase> {
  new (options: MixinOptions<Item>): MixinInstance<Item>
}

export interface MixinInstance<Item extends MixinItemBase> extends Core {}

export interface MixinBase<Item extends MixinItemBase>
  extends Core,
    Pick<ItemizableCoreInstance<Item>, 'items'>,
    Pick<TypeableInstance, 'type'>,
    Pick<BoxModelableInstance, 'width' | 'height'>,
    Pick<AlignableCoreInstance, 'align'>,
    Pick<DirectionableCoreMixinInstance, 'direction'> {
  on: IndexableSelectInstance['on'] & NudgeableInstance['on']
  off: IndexableSelectInstance['off'] & NudgeableInstance['off']
}

export interface MixinItemBase
  extends Core,
    Pick<CssTransformableTranslateInstance, 'translateX' | 'translateY'>,
    Pick<CssTransitionInstance, 'transition'>,
    Pick<BoxModelableInstance, 'width' | 'height'>,
    Pick<ActiveInstance, 'active'> {}