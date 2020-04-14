export interface ControllableLoopMixinOptions {
  loop?: boolean
}

export interface ControllableLoopMixinClass {
  new (options: ControllableLoopMixinOptions): ControllableLoopMixinInstance
}

export interface ControllableLoopMixinInstance {
  loop: boolean
}

export interface ControllableLoopMixinBase {}
