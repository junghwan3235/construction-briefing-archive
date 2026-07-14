export function satelliteTileUrl() {
  return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
}

export function mapInitOptions(site) {
  return {
    center: [site.lat, site.lng],
    zoom: site.zoom_level,
  };
}
