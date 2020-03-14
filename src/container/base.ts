import {
  EVENT_TYPE_INDEX_CHANGE_BEFORE,
  EVENT_TYPE_INDEX_CHANGE_AFTER,
  EventMap,
  EventDetailIndexChange,
} from "./event-map";

export interface Options {
  warn?: (...args: any[]) => void
  [x: string]: any
}

export default class Base {
  // protected
  private _options: Options

  // private
  private _index: number = 0;
  private _rendered: boolean = false;

  /**
   * @param {Object} container
   * @param {Object} options
   */
  constructor({
    warn = console.warn.bind(console),
    ...otherOptions
  }: Options) {
    this._options = {
      warn,
      ...otherOptions,
    }
  }

  on<K extends keyof EventMap>(type: K, listener: (ev: EventMap[K]) => void) {}

  off<K extends keyof EventMap>(type: K, listener: (ev: EventMap[K]) => void) {}

  protected _emit(e: Event) {}

  render() {
    if (this.rendered) {
      this._warn('Carousel has already been rendered.');
      return;
    }

    this._rendered = true;
  }

  get options() {
    return this._options
  }

  get index() {
    return this._index;
  }
  
  get rendered() {
    return this._rendered;
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

    this._index = index;

    const eAfter = new CustomEvent<EventDetailIndexChange>(EVENT_TYPE_INDEX_CHANGE_AFTER, {
      detail: {
        from: this.index,
        to: index
      }
    });
    this._emit(eAfter);

    return true;
  }

  refresh() {}

  destroy() {}
  
  _warn(...args: any[]) {
    if (!this.options.warn) return;
    this.options.warn(...args);
  }
}
