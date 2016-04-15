# ipics [![Build Status](https://travis-ci.org/ingve/ipics.svg?branch=master)](https://travis-ci.org/ingve/ipics)

> Search for thumbnails and images for Itunes media

## Install

```
$ npm install --save ipics
```

## Usage

```js
const ipics = require('ipics');

ipics('sidologie', 'album');
/*
=> [ { name: 'Sidologie',
    thumbnailUrl: 'http://is5.mzstatic.com/image/thumb/Music3/v4/46/47/c2/4647c28d-d4d1-6e3b-a9f4-1b87b749b3a3/source/100x100bb.jpg',
    imageUrl: 'http://is5.mzstatic.com/image/thumb/Music3/v4/46/47/c2/4647c28d-d4d1-6e3b-a9f4-1b87b749b3a3/source/600x600bb.jpg' } ]
*/
```

## API

### ipics(searchTerm, type)

Returns a Promise that resolves to an array of objects with links to thumbnails and corresponding full-size pictures for search results.

#### Valid types:

- ios-app
- mac-app
- album
- movie
- tv-show
- book

## Related

- [ipics-cli](https://github.com/ingve/ipics-cli) - CLI for this module.
- [Images from the iTunes/App/Mac App Stores](http://leancrew.com/all-this/2016/03/images-from-the-itunes-app-mac-app-stores/) (Python)
- [iTunes Artwork Finder](https://bendodson.com/projects/itunes-artwork-finder/) ([PHP](https://github.com/bendodson/itunes-artwork-finder))

## License

MIT © 2016 [Ingve Vormestrand](https://github.com/ingve)
