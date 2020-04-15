# YAC Carousel (Yet Another Carousel)

## Development

### Setup
1. Clone repository
1. Run `npm install` to install all dependencies
1. Run `npm run develop` to start local webpack server. This will open [test page](test/page) automatically in the browser and reload on any code changes.

### Architecture
The carousel is constructed by combining 2 classes: **Container** and **Item**. Various mixins are applied by default to all of these classes in order to extend their functionality and allow for a pluggable architecture.

Take a look at [src/carousel.ts](src/carousel.ts) to get a better idea how the mixins are applied to the classes and [test/page/index.ts](test/page/index.ts) to see how they are used to initialize the carousel.

### Mixins

Mixin | Class | Description | Container&nbsp;Deps | Item&nbsp;Deps
----- | ----- | ----------- | ------------------- | --------------
AlignableCore | Container | Set/get&nbsp;**align**&nbsp;option | |
AlignableElement | Container | Automatically&nbsp;set&nbsp;**align**&nbsp;option&nbsp;by&nbsp;examining&nbsp;CSS styles applied to the element | AlignableCore<br> ElementableCore |
Autoplayable | Container | Allows automatic cycling through items | IndexableSelect |
Controllable | Container | Set/get **controller** instance | ItemizableCoreInstance<br> Typeable<br> BoxModelable<br> AlignableCore<br> DirectionableCoreMixin<br> IndexableSelect<br> Nudgeable |
CssTransformableTranslate | Item | Set/get CSS `transform: translate(...)` style on element | | ElementableCore
