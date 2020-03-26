export const DRAGGING_START_EVENT = 'yacc:dragging:start'

export interface DraggableEventMap {
  'yacc:dragging:start': CustomEvent<DraggingStartEventDetail>
}

export interface DraggingStartEventDetail {
  originalEvent: MouseEvent | TouchEvent
}
