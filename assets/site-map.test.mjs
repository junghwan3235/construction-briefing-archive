import { test } from 'node:test';
import assert from 'node:assert/strict';
import { vworldTileUrl, mapInitOptions } from './site-map.mjs';

test('vworldTileUrl embeds the api key into the Satellite WMTS template', () => {
  const url = vworldTileUrl('MYKEY');
  assert.equal(url, 'https://api.vworld.kr/req/wmts/1.0.0/MYKEY/Satellite/{z}/{y}/{x}.jpeg');
});

test('mapInitOptions maps site lat/lng/zoom_level to Leaflet init options', () => {
  const site = { lat: 37.5006, lng: 127.0364, zoom_level: 15 };
  assert.deepEqual(mapInitOptions(site), { center: [37.5006, 127.0364], zoom: 15 });
});
