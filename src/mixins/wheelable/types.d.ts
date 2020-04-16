import { IndexableSelectNextPreviousMixinInstance } from '../indexable/select-next-previous'

export interface WheelableMixinOptions {}

export interface WheelableMixinClass {
  new (options: WheelableMixinOptions): WheelableMixinInstance
}

export interface WheelableMixinInstance {
  render: () => void
  destroy: () => void
}

export interface WheelableMixinBase
  extends Pick<
    IndexableSelectNextPreviousMixinInstance,
    'selectNext' | 'selectPrevious'
  > {
  element: HTMLElement
  render(): void
  destroy(): void
}
