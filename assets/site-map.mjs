export function vworldTileUrl(apiKey) {
  return `https://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Satellite/{z}/{y}/{x}.jpeg`;
}

export function mapInitOptions(site) {
  return {
    center: [site.lat, site.lng],
    zoom: site.zoom_level,
  };
}
