import { default as ControllerClass } from '../../classes/controller'
import { MixinInstance as NudgeableInstance } from '../nudgeable/types'
import { IndexableSelectInstance } from '../indexable/select/types'
import Core from '../../classes/core'
import { MixinInstance as ItemizableCoreInstance } from '../itemizable/core/types'
import { MixinInstance as TypeableInstance } from '../typeable/horizontal-vertical/types'
import { BoxModelableInstance } from '../box-modelable'
import { CssTransformableTranslateInstance } from '../css-transformable/translate/types'
import { CssTransitionInstance } from '../css-transitionable/types'
import { ActiveInstance } from '../activatable'
import { AlignableCoreInstance } from '../alignable/core'
import { DirectionableCoreMixinInstance } from '../directionable/core'

export interface MixinOptions<
  Item extends MixinItemBase,
  Controller extends MixinControllerBase
> {
  controller?: InstanceType<Controller>
}

export interface MixinClass<
  Item extends MixinItemBase,
  Controller extends MixinControllerBase
> {
  new (options: MixinOptions<Item, Controller>): MixinInstance<Item>
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

export type MixinControllerBase = typeof ControllerClass

export type MixinControllerConstructor<
  Controller extends ControllerClass
> = new () => Controller
