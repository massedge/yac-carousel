import { MixinInstance as EventableInstance } from '../../eventable/types'

export interface DraggableCoreMixinOptions {}

export interface DraggableCoreMixinClass {
  new (options?: DraggableCoreMixinOptions): DraggableCoreMixinInstance
}

export interface DraggableCoreMixinInstance {
  _dragging: boolean
  _preventDragging(e: UIEvent): boolean
  on: <K extends keyof DraggableCoreMixinEventMap>(
    type: K,
    listener: (ev: DraggableCoreMixinEventMap[K]) => void
  ) => void
  off: <K extends keyof DraggableCoreMixinEventMap>(
    type: K,
    listener: (ev: DraggableCoreMixinEventMap[K]) => void
  ) => void
}

export interface DraggableCoreMixinBase
  extends Pick<EventableInstance, 'emitter'> {}

export interface DraggableCoreMixinEventMap {
  'yac:dragging:start': CustomEvent<DraggableCoreMixinDraggingStartEventDetail>
}

interface DraggableCoreMixinDraggingStartEventDetail {
  originalEvent: UIEvent
}
