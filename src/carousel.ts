// base class
import Core from './classes/core'

// mixins
import AlignableCoreMixin from './mixins/alignable/core'
import AlignableFlexElementMixin from './mixins/alignable/element/flex'
import Autoplayable from './mixins/autoplayable'
import BoxModelable from './mixins/box-modelable'
import DirectionableCore from './mixins/directionable/core'
import DirectionableElement from './mixins/directionable/element'
import DraggableCore from './mixins/draggable/core'
import DraggableMouse from './mixins/draggable/mouse'
import DraggableTouch from './mixins/draggable/touch'
import DraggablePreventOnDraggableElement from './mixins/draggable/prevent-on-draggable-element'
import DraggablePreventOnInputElement from './mixins/draggable/prevent-on-input-element'
import Elementable from './mixins/elementable/core'
import Focusable from './mixins/focusable'
import FocusElementable from './mixins/elementable/focus'
import IndexablePreviousNext from './mixins/indexable/previous-next'
import IndexableSelect from './mixins/indexable/select'
import ItemizableController from './mixins/itemizable/controller'
import ItemizableCore from './mixins/itemizable/core'
import ItemizableSelectOnFocusedItem from './mixins/itemizable/select-on-focused-item'
import Nudgeable from './mixins/nudgeable'
import WindowResizeRefreshable from './mixins/refreshable/window-resize'
import PreventScrollTransformableMixin from './mixins/transformable/prevent-scroll'
import TypeableHorizontalVerticalMixin from './mixins/typeable/horizontal-vertical'
import Wheelable from './mixins/wheelable'

// container
import ElementEventable from './mixins/eventable/element'
import Visible from './mixins/container/visible'

// item
import ItemActivatable from './mixins/item/activatable'
import ItemCssTransformTranslate from './mixins/item/css-transform/translate'
import ItemCssTransition from './mixins/item/css-transition'
import ItemVisible from './mixins/item/visible'

export const CarouselItem = BoxModelable(
  FocusElementable(
    Focusable(
      ItemActivatable(
        ItemVisible(
          ItemCssTransformTranslate(
            ItemCssTransition(ElementEventable(Elementable(Core)))
          )
        )
      )
    )
  )
)

const CarouselItemizableBase = BoxModelable(
  Nudgeable(ElementEventable(Elementable(Core)))
)

const Carousel = WindowResizeRefreshable(
  ItemizableSelectOnFocusedItem(
    PreventScrollTransformableMixin(
      Autoplayable(
        Visible(
          Wheelable(
            DraggablePreventOnDraggableElement(
              DraggablePreventOnInputElement(
                DraggableTouch(
                  DraggableMouse(
                    DraggableCore(
                      IndexablePreviousNext(
                        IndexableSelect(
                          ItemizableController(
                            AlignableFlexElementMixin(
                              AlignableCoreMixin(
                                DirectionableElement(
                                  DirectionableCore(
                                    TypeableHorizontalVerticalMixin(
                                      ItemizableCore<
                                        InstanceType<typeof CarouselItem>,
                                        typeof CarouselItemizableBase
                                      >(CarouselItemizableBase)
                                    )
                                  )
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  )
)

export default Carousel
