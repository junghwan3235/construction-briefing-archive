export function filterSites(sites, tag) {
  if (tag === 'all') return sites;
  return sites.filter((site) => site.scale_tag === tag);
}

export function sortByDiscoveredDesc(sites) {
  return [...sites].sort((a, b) => (a.discovered_at < b.discovered_at ? 1 : -1));
}

export function scaleTagLabel(tag) {
  if (tag === 'large') return '대규모';
  if (tag === 'small') return '소규모';
  throw new Error(`Unknown scale_tag: ${tag}`);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function cardHtml(site) {
  const label = scaleTagLabel(site.scale_tag);
  return `<a class="card" href="sites/${escapeHtml(site.slug)}.html">
  <span class="badge badge-${site.scale_tag}">${label}</span>
  <h3>${escapeHtml(site.address)}</h3>
  <p>${escapeHtml(site.summary)}</p>
  <time>${escapeHtml(site.discovered_at)}</time>
</a>`;
}
