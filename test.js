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

test('Invalid media types are rejected', async t => {
  t.throws(ipics('ou812', 'bogus'));
});

test('Valid media types are not rejected', async t => {
  t.notThrows(ipics('omnifocus', 'ios-app'));
});

test('Media types are not case sensitive', async t => {
  t.notThrows(ipics('omnifocus', 'IoS-ApP'));
});

test('Returns an empty array when no search results are returned', async t => {
  const results = await ipics('901AE37CF2484E7BAEEC3FBBAF51AE17', 'album');
  t.true(Array.isArray(results));
  t.true(results.length === 0);
});
