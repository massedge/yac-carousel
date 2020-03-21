import {
  EVENT_TYPE_INDEX_CHANGE_BEFORE,
  EVENT_TYPE_INDEX_CHANGE_AFTER,
  EventMap,
  EventDetailIndexChange,
} from "./event-map";

export interface CoreOptions {
  warn?: (message: string) => void
}

export default class Core {
  #warn: CoreOptions['warn']
  #index: number = 0;
  #rendered: boolean = false;
  #destroyed: boolean = false;

  constructor({
    warn = console.warn.bind(console)
  }: CoreOptions) {
    this.#warn = warn
  }

  on<K extends keyof EventMap>(type: K, listener: (ev: EventMap[K]) => void) { /**/ }

  off<K extends keyof EventMap>(type: K, listener: (ev: EventMap[K]) => void) { /**/ }

  _emit(e: Event) { /**/ }

  render() {
    if (this.#rendered) return false
    this.#rendered = true;
    return true
  }

  get index() {
    return this.#index;
  }

  next() {
    return this.select(this.index + 1);
  }

  previous() {
    return this.select(this.index - 1);
  }

  select(index: number) {
    const eBefore = new CustomEvent<EventDetailIndexChange>(EVENT_TYPE_INDEX_CHANGE_BEFORE, {
      cancelable: true,
      detail: {
        from: this.index,
        to: index
      }
    });
    this._emit(eBefore);

    if (eBefore.defaultPrevented) {
      return false;
    }

    this.#index = index;

    const eAfter = new CustomEvent<EventDetailIndexChange>(EVENT_TYPE_INDEX_CHANGE_AFTER, {
      detail: {
        from: this.index,
        to: index
      }
    });
    this._emit(eAfter);

    return true;
  }

  refresh() { /**/ }

  destroy() {
    if (!this.#rendered) return false
    if (this.#destroyed) return false
    this.#destroyed = true
    return true
  }
  
  _warn(message: string) {
    if (!this.#warn) return;
    this.#warn(message);
  }
}
