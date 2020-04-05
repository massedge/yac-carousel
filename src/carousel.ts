// base class
import Core from './classes/core'

// mixins
import AlignableCoreMixin from './mixins/alignable/core'
import AlignableFlexElementMixin from './mixins/alignable/element/flex'
import Autoplayable from './mixins/autoplayable'
import BoxModelable from './mixins/box-modelable'
import DirectionableCore from './mixins/directionable/core'
import DirectionableElement from './mixins/directionable/element'
import Elementable from './mixins/elementable/core'
import Focusable from './mixins/focusable'
import FocusElementable from './mixins/elementable/focus'
import IndexablePreviousNext from './mixins/indexable/previous-next'
import IndexableSelect from './mixins/indexable/select'
import Nudgeable from './mixins/nudgeable'
import WindowResizeRefreshable from './mixins/refreshable/window-resize'
import PreventScrollTransformableMixin from './mixins/transformable/prevent-scroll'
import TypeableHorizontalVerticalMixin from './mixins/typeable/horizontal-vertical'
import Wheelable from './mixins/wheelable'

// container
import DraggableCore from './mixins/container/draggable/core'
import DraggableMouse from './mixins/container/draggable/mouse'
import DraggableTouch from './mixins/container/draggable/touch'
import DraggablePreventOnDraggableEvent from './mixins/container/draggable/prevent-on-draggable-element'
import DraggablePreventOnInputEvent from './mixins/container/draggable/prevent-on-input-element'
import ElementEventable from './mixins/eventable/element'
import ItemizableController from './mixins/container/itemizable/controller'
import ItemizableCore from './mixins/container/itemizable/core'
import ItemizableSelectOnFocusedItem from './mixins/container/itemizable/select-on-focused-item'
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
            DraggablePreventOnDraggableEvent(
              DraggablePreventOnInputEvent(
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
