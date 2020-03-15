import YacCarousel, { Direction, ContainerNavable as Navable } from '../../src'

const elHorizontal = document.querySelector('.carousel.flex');
const c = new (Navable(YacCarousel))({
  container: elHorizontal as HTMLElement,
  previousText: 'Previous',
  nextText: 'Next',
})
c.render();

const elVertical = document.querySelector('.carousel.flex.vertical');
const cVertical = new YacCarousel({
  container: elVertical as HTMLElement,
  direction: Direction.VERTICAL,
})
cVertical.render();
