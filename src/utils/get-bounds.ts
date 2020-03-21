export const getBounds = (element: HTMLElement) => {
  const cs = window.getComputedStyle(element)

  const props = {
    paddingLeft: cs.paddingLeft ? parseFloat(cs.paddingLeft) : 0,
    paddingRight: cs.paddingRight ? parseFloat(cs.paddingRight) : 0,
    paddingTop: cs.paddingTop ? parseFloat(cs.paddingTop) : 0,
    paddingBottom: cs.paddingBottom ? parseFloat(cs.paddingBottom) : 0,

    borderLeft: cs.borderLeft ? parseFloat(cs.borderLeft) : 0,
    borderRight: cs.borderRight ? parseFloat(cs.borderRight) : 0,
    borderTop: cs.borderTop ? parseFloat(cs.borderTop) : 0,
    borderBottom: cs.borderBottom ? parseFloat(cs.borderBottom) : 0,

    marginLeft: cs.marginLeft ? parseFloat(cs.marginLeft) : 0,
    marginRight: cs.marginRight ? parseFloat(cs.marginRight) : 0,
    marginTop: cs.marginTop ? parseFloat(cs.marginTop) : 0,
    marginBottom: cs.marginBottom ? parseFloat(cs.marginBottom) : 0,
  }

  const rect = element.getBoundingClientRect()
  const widthBorder = rect.width
  const heightBorder = rect.height

  const widthPadding = widthBorder - props.paddingLeft - props.paddingRight
  const heightPadding = heightBorder - props.paddingTop - props.paddingBottom

  return {
    ...props,
    width: widthPadding - props.borderLeft - props.borderRight,
    height: heightPadding - props.borderTop - props.borderBottom,
    widthPadding,
    heightPadding,
    widthBorder,
    heightBorder,
    widthMargin: widthBorder + props.marginLeft + props.marginRight,
    heightMargin: heightBorder + props.marginTop + props.marginBottom,
  }
}
