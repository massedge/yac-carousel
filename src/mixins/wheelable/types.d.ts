export interface WheelableMixinOptions {}

export interface WheelableMixinClass {
  new (options: WheelableMixinOptions): WheelableMixinInstance
}

export interface WheelableMixinInstance {
  render: () => void
  destroy: () => void
}

export interface WheelableMixinBase {
  element: HTMLElement
  render(): void
  previous(): void
  next(): void
  destroy(): void
}
