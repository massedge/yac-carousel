import { ElementableInstance } from '../core'

export interface ElementableFocusIEWorkaroundMixinClass {
  new (...args: any[]): ElementableFocusIEWorkaroundMixinInstance
}

export interface ElementableFocusIEWorkaroundMixinInstance {}

export interface ElementableFocusIEWorkaroundMixinBase
  extends Pick<ElementableInstance, 'element'> {
  render(): void
  destroy(): void
}
