import { satelliteTileUrl, mapInitOptions } from './site-map.mjs';
import { scaleTagLabel } from './cards.mjs';

async function main() {
  const res = await fetch(`../data/${window.SLUG}.json`);
  const site = await res.json();

  const { center, zoom } = mapInitOptions(site);
  const map = L.map('map').setView(center, zoom);
  L.tileLayer(satelliteTileUrl(), {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 19,
  }).addTo(map);
  L.marker(center).addTo(map);

  document.getElementById('address').textContent = site.address;
  const scaleTagEl = document.getElementById('scale-tag');
  scaleTagEl.textContent = scaleTagLabel(site.scale_tag);
  scaleTagEl.classList.add(`badge-${site.scale_tag}`);
  document.getElementById('construction-type').textContent = site.construction_type;
  document.getElementById('progress-stage').textContent = site.progress_stage;
  document.getElementById('summary').textContent = site.summary;
  document.getElementById('discovered-at').textContent = site.discovered_at;
}

main().catch(() => {
  document.getElementById('map').textContent = '지도를 불러올 수 없습니다';
});
