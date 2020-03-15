import YacCarousel, { Direction, ContainerNavable as Navable } from '../../src'

const elHorizontal = document.querySelector<HTMLElement>('.carousel.flex');
if (!elHorizontal) throw Error('Horizontal carousel element not found.');

const c = new (Navable(YacCarousel))({
  element: elHorizontal,
  previousText: 'Previous',
  nextText: 'Next',
})
c.render();

const elVertical = document.querySelector<HTMLElement>('.carousel.flex.vertical');
if (!elVertical) throw Error('Vertical carousel element not found.');

const cVertical = new YacCarousel({
  element: elVertical,
  direction: Direction.VERTICAL,
})
cVertical.render();
