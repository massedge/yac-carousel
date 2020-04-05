import Base from '../__mocks__/base'
import AutoplayMixin from '..'

jest.useFakeTimers()

describe('autoplay mixin', () => {
  const Cls = AutoplayMixin(Base)

  describe('initialization', () => {
    test('default options', () => {
      const instance = new Cls({
        items: [],
      })

      expect(instance.autoplayEnabled).toBe(false)
      expect(instance.autoplayLoop).toBe(true)
      expect(instance.autoplayPaused).toBe(false)
      expect(instance.autoplaySpeed).toBe(3000)
    })

    test('custom options', () => {
      let instance: InstanceType<typeof Cls>

      instance = new Cls({
        items: [],
        autoplay: {
          enabled: true,
        },
      })
      expect(instance.autoplayEnabled).toBe(true)

      instance = new Cls({
        items: [],
        autoplay: {
          loop: false,
        },
      })
      expect(instance.autoplayLoop).toBe(false)

      instance = new Cls({
        items: [],
        autoplay: {
          paused: true,
        },
      })
      expect(instance.autoplayPaused).toBe(true)

      instance = new Cls({
        items: [],
        autoplay: {
          speed: 1000,
        },
      })
      expect(instance.autoplaySpeed).toBe(1000)
    })
  })

  test('basic playback', () => {
    const instance = new Cls({
      items: [0, 1, 2],
      index: 0,
      autoplay: {
        enabled: true,
        speed: 1000,
      },
    })
    instance.render()

    expect(instance.index).toBe(0)
    jest.advanceTimersByTime(1000)
    expect(instance.index).toBe(1)
    jest.advanceTimersByTime(1000)
    expect(instance.index).toBe(2)
    jest.advanceTimersByTime(1000)
    expect(instance.index).toBe(0)
  })

  test('pause/unpause', () => {
    const instance = new Cls({
      items: [0, 1, 2],
      index: 0,
      autoplay: {
        enabled: true,
        speed: 1000,
        paused: true,
      },
    })
    instance.render()

    jest.advanceTimersByTime(1000)
    expect(instance.index).toBe(0)

    instance.autoplayPaused = false
    jest.advanceTimersByTime(1000)
    expect(instance.index).toBe(1)
    jest.advanceTimersByTime(1000)
    expect(instance.index).toBe(2)

    instance.autoplayPaused = true
    jest.advanceTimersByTime(1000)
    expect(instance.index).toBe(2)
  })

  test('enabled/disabled', () => {
    const instance = new Cls({
      items: [0, 1, 2],
      index: 0,
      autoplay: {
        enabled: true,
        speed: 1000,
        paused: false,
      },
    })
    instance.render()

    jest.advanceTimersByTime(1000)
    expect(instance.index).toBe(1)

    instance.autoplayEnabled = false
    jest.advanceTimersByTime(1000)
    expect(instance.index).toBe(1)
    jest.advanceTimersByTime(1000)
    expect(instance.index).toBe(1)

    instance.autoplayEnabled = true
    jest.advanceTimersByTime(1000)
    expect(instance.index).toBe(2)
  })

  test('loop', () => {
    const instance = new Cls({
      items: [0, 1, 2],
      index: 2,
      autoplay: {
        enabled: true,
        speed: 1000,
        paused: false,
        loop: false,
      },
    })
    instance.render()

    expect(instance.index).toBe(2)
    jest.advanceTimersByTime(1000)
    expect(instance.index).toBe(2)

    instance.autoplayLoop = true
    jest.advanceTimersByTime(1000)
    expect(instance.index).toBe(0)

    instance.select(1)
    instance.autoplayLoop = false
    jest.advanceTimersByTime(500)
    instance.select(2)
    jest.advanceTimersByTime(500)
    expect(instance.index).toBe(2)
  })
})
