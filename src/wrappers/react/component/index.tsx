import { createElement, useRef, useEffect, forwardRef } from 'react'
import YacCarousel from "../../../carousel";

export interface Props<C extends typeof YacCarousel> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  as?: string,
  init?: Omit<ConstructorParameters<C>[0], 'element' | 'items' | 'itemConstructor'>,
  carouselRef?: ((carousel: InstanceType<C> | null) => void) | React.MutableRefObject<InstanceType<C> | null | undefined> | null
}

const createComponent = (CarouselContructor: typeof YacCarousel) => {
  return forwardRef<HTMLDivElement, Props<typeof CarouselContructor>>(({
    as = 'div',
    init = {},
    carouselRef,
    children,
    ...otherProps
  }, ref2) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (typeof ref2 === 'function') {
        ref2(ref.current)
      } else if (ref2) {
        ref2.current = ref.current
      }
    }, [ref.current])

    useEffect(() => {
      if (!ref.current) return

      const carousel = new YacCarousel({
        element: ref.current,
        items: ref.current.children,
        ...init,
      })
      carousel.render()

      if (typeof carouselRef === 'function') {
        carouselRef(carousel)
      } else if (carouselRef) {
        carouselRef.current = carousel
      }

      return () => {
        carousel.destroy()

        if (typeof carouselRef === 'function') {
          carouselRef(null)
        } else if (carouselRef) {
          carouselRef.current = null
        }
      }
    })

    return createElement(as, {
      ...otherProps,
      ref,
    }, children)
  })
}

export default createComponent
