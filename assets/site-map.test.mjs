import { test } from 'node:test';
import assert from 'node:assert/strict';
import { satelliteTileUrl, mapInitOptions } from './site-map.mjs';

test('satelliteTileUrl returns the no-key Esri World Imagery XYZ template', () => {
  const url = satelliteTileUrl();
  assert.equal(url, 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
});

test('mapInitOptions maps site lat/lng/zoom_level to Leaflet init options', () => {
  const site = { lat: 37.5006, lng: 127.0364, zoom_level: 15 };
  assert.deepEqual(mapInitOptions(site), { center: [37.5006, 127.0364], zoom: 15 });
});
