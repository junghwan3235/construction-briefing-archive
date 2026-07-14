import { filterSites, sortByDiscoveredDesc, cardHtml } from './cards.mjs';

async function main() {
  const res = await fetch('data/index.json');
  const sites = await res.json();
  const grid = document.getElementById('card-grid');
  const buttons = document.querySelectorAll('.filter-tab');

  function render(tag) {
    const filtered = sortByDiscoveredDesc(filterSites(sites, tag));
    grid.innerHTML = filtered.map(cardHtml).join('');
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.tag);
    });
  });

  render('all');
}

main();
