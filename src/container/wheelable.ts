import _debounce from 'lodash-es/debounce'

import { ComposeConstructor } from "../types"
import { Elementable, ElementableInstance, ElementableOptions } from './elementable';
import Core from './core';

export interface WheelableOptions extends ElementableOptions {
}

export interface Wheelable {
  new(options: WheelableOptions): WheelableInstance
}

export interface WheelableInstance {
  render: () => void
  destroy: () => void
}

export default function Wheelable<T extends {
  new (options: any): ElementableInstance & Core
} & Pick<Elementable, keyof Elementable>>(Base: T) {
  class Mixin extends (Base as unknown as new (options: WheelableOptions) => ElementableInstance & Core) implements WheelableInstance {
    private wheelFn: (e: WheelEvent) => void

    constructor(options: WheelableOptions) {
      super(options);

      // use debounce allow for more fine-grained navigation when using touchpad
      this.wheelFn = _debounce(this.wheel.bind(this), 15, {
        leading: true,
        trailing: true,
      })
    }
    
    render() {
      super.render();

      this.element.addEventListener('wheel', this.wheelFn);
    }

    private wheel(e: WheelEvent) {
      // TODO: check if nested element is scrollable
      const offset = this.getWheelEventDelta(e);

      let result
      if (offset < 0) result = this.previous()
      else if (offset > 0) result = this.next()
      else result = false

      // prevent scrolling of parent elements, if nudge was successful
      if (result) {
        e.preventDefault();
      }
    }

    private getWheelEventDelta(e: WheelEvent) {
      return e.deltaY || e.deltaX
    }

    destroy() {
      this.element.removeEventListener('wheel', this.wheelFn);
      super.destroy();
    }
  }
  
  return Mixin as unknown as ComposeConstructor<Wheelable, typeof Base>
}
