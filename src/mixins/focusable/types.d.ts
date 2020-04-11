export interface MixinOptions {}

export interface MixinClass {
  new (options: MixinOptions): MixinInstance
}

export interface MixinInstance {
  readonly focused: boolean
  focus(): boolean
  blur(): boolean
  on: <K extends keyof MixinEventMap>(
    type: K,
    listener: (ev: MixinEventMap[K]) => void
  ) => void
  off: <K extends keyof MixinEventMap>(
    type: K,
    listener: (ev: MixinEventMap[K]) => void
  ) => void
}

export interface MixinBase {
  _on(type: string, listener: (evt: CustomEvent) => void): void
  off(type: string, listener: (evt: CustomEvent) => void): void
  _emit(evt: CustomEvent): void
}

export interface MixinEventMap {
  'yac:focus': CustomEvent<FocusEventDetail>
  'yac:blur': CustomEvent<BlurEventDetail>
  'yac:focus:changed': CustomEvent<FocusedChangedEventDetail>
}

export interface FocusEventDetail {}
export interface BlurEventDetail {}
export interface FocusedChangedEventDetail {
  focused: boolean
}
