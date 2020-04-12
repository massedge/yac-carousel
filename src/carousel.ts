// base class
import Core from './classes/core'

import {
  Activatable,
  AlignableCore,
  AlignableFlexElement,
  Autoplayable,
  BoxModelable,
  Controller,
  CssTransformableTranslate,
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
  Controllable,
  ItemizableAutoRender,
  ItemizableCore,
  ItemizableSelectOnFocusedItem,
  Nudgeable,
  RefreshableWindowResize,
  TransformablePreventScroll,
  TypeableHorizontalVertical,
  VisibleContainerElement,
  VisibleContainerItem,
  Wheelable,
} from './lib'

export const CarouselController = Controller

export const CarouselItem = BoxModelable(
  ElementableFocus(
    Focusable(
      Activatable(
        VisibleContainerItem(
          CssTransformableTranslate(
            CssTransitionable(EventableElement(ElementableCore(Core)))
          )
        )
      )
    )
  )
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
                        Controllable(
                          IndexableSelect(
                            AlignableFlexElement(
                              AlignableCore(
                                DirectionableElement(
                                  DirectionableCore(
                                    TypeableHorizontalVertical(
                                      ItemizableAutoRender(
                                        ItemizableCore(
                                          BoxModelable(
                                            Nudgeable(
                                              EventableElement(
                                                ElementableCore(Core)
                                              )
                                            )
                                          ),
                                          CarouselItem
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
  )
)

export default Carousel
