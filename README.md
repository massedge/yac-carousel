# YAC Carousel (Yet Another Carousel)

## Development

### Setup
1. Clone repository
1. Run `npm install` to install all dependencies
1. Run `npm run develop` to start local webpack server. This will open [test page](test/page) automatically in the browser and reload on any code changes.

### Architecture
The carousel is constructed by combining 3 classes: **Container**, **Item**, and **Controller**. Various mixins are applied by default to all of these classes in order to extend their functionality and allow for a pluggable architecture.

Take a look at [src/carousel.ts](src/carousel.ts) to get a better idea how the mixins are applied to the classes and [test/page/index.ts](test/page/index.ts) to see how they are used to initialize the carousel.
