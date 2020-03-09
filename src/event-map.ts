export const EVENT_TYPE_INDEX_CHANGE_BEFORE = 'yacc:index:change:before'
export const EVENT_TYPE_INDEX_CHANGE_AFTER = 'yacc:index:change:after'

export interface EventDetailIndexChange {
  from: number
  to: number
}

export interface EventMap {
  [EVENT_TYPE_INDEX_CHANGE_BEFORE]: CustomEvent<EventDetailIndexChange>
  [EVENT_TYPE_INDEX_CHANGE_AFTER]: CustomEvent<EventDetailIndexChange>
}
