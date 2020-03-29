export interface NudgeOptions {
  x?: number
  y?: number
  time?: number
}

export default class Nudge {
  readonly x: number
  readonly y: number
  readonly time: number

  constructor(
    { x = 0, y = 0, time = performance.now() }: NudgeOptions = {
      x: 0,
      y: 0,
      time: performance.now(),
    }
  ) {
    this.x = x
    this.y = y
    this.time = time
  }
}
