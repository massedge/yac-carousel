export interface MixinOptions {}

export interface MixinClass {
  new (options?: MixinOptions): MixinInstance
}

export interface MixinInstance {
  readonly emitter: Emitter
}

export interface MixinBase {}

interface Emitter {
  on(type: string, listener: (evt: CustomEvent) => void): void
  off(type: string, listener: (evt: CustomEvent) => void): void
  emit(e: CustomEvent): void
}
