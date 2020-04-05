// base class
import Core from './classes/core'

import {
  Activatable,
  AlignableCore,
  AlignableFlexElement,
  Autoplayable,
  BoxModelable,
  CssTransitionable,
  DirectionableCore,
  DirectionableElement,
  DraggableCore,
  DraggableMouse,
  DraggableTouch,
  DraggablePreventOnDraggableElement,
  DraggablePreventOnInputElement,
  ElementableCore,
  ElementableFocus,
  EventableElement,
  Focusable,
  IndexablePreviousNext,
  IndexableSelect,
  ItemizableController,
  ItemizableCore,
  ItemizableSelectOnFocusedItem,
  Nudgeable,
  RefreshableWindowResize,
  TransformablePreventScroll,
  TypeableHorizontalVertical,
  VisibleContainerElement,
  VisibleContainerItem,
  Wheelable,
  ItemCssTransformTranslate,
} from './lib'

export const CarouselItem = BoxModelable(
  ElementableFocus(
    Focusable(
      Activatable(
        VisibleContainerItem(
          ItemCssTransformTranslate(
            CssTransitionable(EventableElement(ElementableCore(Core)))
          )
        )
      )
    )
  )
)

const CarouselItemizableBase = BoxModelable(
  Nudgeable(EventableElement(ElementableCore(Core)))
)

const Carousel = RefreshableWindowResize(
  ItemizableSelectOnFocusedItem(
    TransformablePreventScroll(
      Autoplayable(
        VisibleContainerElement(
          Wheelable(
            DraggablePreventOnDraggableElement(
              DraggablePreventOnInputElement(
                DraggableTouch(
                  DraggableMouse(
                    DraggableCore(
                      IndexablePreviousNext(
                        IndexableSelect(
                          ItemizableController(
                            AlignableFlexElement(
                              AlignableCore(
                                DirectionableElement(
                                  DirectionableCore(
                                    TypeableHorizontalVertical(
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
