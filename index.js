'use strict';
const arrayIncludes = require('array-includes');
const got = require('got');
const queryString = require('query-string');
const mediaDefaults = require('./media_defaults.json');

module.exports = (term, type) => {
  return new Promise((resolve, reject) => {
    const normalizedType = type.toLowerCase();
    const validTypes = Object.keys(mediaDefaults);
    if (arrayIncludes(validTypes, normalizedType)) {
      const media = mediaDefaults[normalizedType].media || '';
      const entity = mediaDefaults[normalizedType].entity || '';
      const name = mediaDefaults[normalizedType].name || '';
      const searchOptions = {term: term, media: media, entity: entity, name: name};
      const query = queryString.stringify(searchOptions);
      const url = `https://itunes.apple.com/search?${query}`;
      got(url).then(response => {
        const jsonResponse = JSON.parse(response.body);
        const results = jsonResponse.results || [];
        let pictureLinks = [];
        results.forEach(result => {
          const name = result[searchOptions.name];
          const thumbnailUrl = result.artworkUrl100;
          const imageUrl = thumbnailUrl.replace('100x100', '600x600');
          pictureLinks.push({name: name, thumbnailUrl: thumbnailUrl, imageUrl: imageUrl});
        });
        resolve(pictureLinks);
      }).catch(error => {
        reject(error);
      });
    }
    else {
      reject(`'${normalizedType}' is not a valid type`);
    }
  });
};
