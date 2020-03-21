import { ComposeConstructor } from "../../../types"
import {
  IndexableSelectMixin,
  IndexableSelectBase,
  IndexableSelectOptions,
  IndexableSelectInstance,
  IndexableSelectEventMap,
  IndexableSelectEventDetail,
} from './types'

export const SELECT_BEFORE_EVENT = 'yacc:select:before'
export const SELECT_AFTER_EVENT = 'yacc:select:after'

export default function IndexableSelect<T extends new (o: any) => IndexableSelectBase>(Base: T) {
  class Mixin extends (Base as new (options: IndexableSelectOptions) => IndexableSelectBase) implements IndexableSelectInstance {
    #index: number;

    constructor({
      index = 0,
      ...otherOptions
    }: IndexableSelectOptions) {
      super({index, ...otherOptions})

      this.#index = index
    }
    
    on<K extends keyof IndexableSelectEventMap>(type: K, listener: (ev: IndexableSelectEventMap[K]) => void) {
      return super.on.call(this, type, listener)
    }
  
    off<K extends keyof IndexableSelectEventMap>(type: K, listener: (ev: IndexableSelectEventMap[K]) => void) {
      return super.off.call(this, type, listener)
    }

    get index() {
      return this.#index
    }

    select(index: number) {
      const eBefore = new CustomEvent<IndexableSelectEventDetail>(SELECT_BEFORE_EVENT, {
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
  
      const eAfter = new CustomEvent<IndexableSelectEventDetail>(SELECT_AFTER_EVENT, {
        detail: {
          from: this.index,
          to: index
        }
      });
      this._emit(eAfter);
  
      return true;
    }
  }
  
  return Mixin as unknown as ComposeConstructor<IndexableSelectMixin, typeof Base>
}

