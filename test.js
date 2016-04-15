'use strict';
import test from 'ava';
import ipics from './index.js';

test('Returns an array of results', async t => {
  const results = await ipics('ou812', 'album');
  t.true(Array.isArray(results));
});

test('Results have keys "name", "thumbnailUrl", "imageUrl"', async t => {
  const results = await ipics('twin peaks', 'tv-show');
  const firstResult = results[0];
  const keys = Object.keys(firstResult);
  t.deepEqual(keys, ['name', 'thumbnailUrl', 'imageUrl']);
});

test('Values for url keys are HTTPish', async t => {
  const results = await ipics('ou812', 'album');
  const firstResult = results[0];
  const imageUrl = firstResult.imageUrl;
  const thumbnailUrl = firstResult.thumbnailUrl;
  const HTTPish = /^https?:\/\//;
  t.regex(imageUrl, HTTPish);
  t.regex(thumbnailUrl, HTTPish);
});
