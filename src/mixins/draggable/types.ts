export const DRAGGING_START_EVENT = 'yac:dragging:start'

export interface DraggableEventMap {
  'yac:dragging:start': CustomEvent<DraggingStartEventDetail>
}

export interface DraggingStartEventDetail {
  originalEvent: MouseEvent | TouchEvent
}
