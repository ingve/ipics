'use strict';
const got = require('got');
const queryString = require('query-string');
const mediaDefaults = require('./media_defaults.json');

module.exports = (term, type) => {
  return new Promise((resolve, reject) => {
    const media = mediaDefaults[type].media || '';
    const entity = mediaDefaults[type].entity || '';
    const name = mediaDefaults[type].name || '';
    const searchOptions = {term: term, media: media, entity: entity, name: name};
    const query = queryString.stringify(searchOptions);
    const url = 'https://itunes.apple.com/search?' + query;
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
  });
};
