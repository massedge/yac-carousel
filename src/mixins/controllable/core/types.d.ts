import Core from '../../../classes/core'
import { ItemizableCoreMixinInstance } from '../../itemizable/core'
import { CssTransformableTranslateInstance } from '../../css-transformable/translate/types'
import { CssTransitionInstance } from '../../css-transitionable/types'
import { BoxModelableMixinInstance } from '../../box-modelable'

export interface ControllableCoreMixinOptions {}

export interface ControllableCoreMixinClass {
  new (options: ControllableCoreMixinOptions): ControllableCoreMixinInstance
}

export interface ControllableCoreMixinInstance {
  readonly _controllerItems: ControllableCoreMixinControllerItem[]
  readonly _position: { x: number; y: number }
  _length(axis: 'horizontal' | 'vertical'): number
  _itemsLength(axis: 'horizontal' | 'vertical'): number
  _processControllerActions(actions: ControllableCoreMixinAction[]): void
}

export interface ControllableCoreMixinBase<
  Item extends ControllableCoreMixinItemBase
>
  extends Pick<ItemizableCoreMixinInstance<Item>, 'items'>,
    Pick<BoxModelableMixinInstance, 'width' | 'height'> {
  render(): void
}

export interface ControllableCoreMixinItemBase
  extends Core,
    Pick<CssTransformableTranslateInstance, 'translateX' | 'translateY'>,
    Pick<CssTransitionInstance, 'transition'>,
    Pick<BoxModelableMixinInstance, 'width' | 'height'> {}

export interface ControllableCoreMixinAction {
  type: 'itemTranslate'
  index: number
  x?: number
  y?: number
  ease?: string
}

export interface ControllableCoreMixinControllerItem {
  width: number
  height: number
  margin: [number, number, number, number]
  leftOffset: number
  topOffset: number
}
