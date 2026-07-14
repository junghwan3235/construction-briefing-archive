import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterSites, sortByDiscoveredDesc, scaleTagLabel, cardHtml } from './cards.mjs';

test('filterSites returns all sites when tag is all', () => {
  const sites = [{ scale_tag: 'large' }, { scale_tag: 'small' }];
  assert.deepEqual(filterSites(sites, 'all'), sites);
});

test('filterSites filters by scale_tag', () => {
  const sites = [{ scale_tag: 'large' }, { scale_tag: 'small' }];
  assert.deepEqual(filterSites(sites, 'small'), [{ scale_tag: 'small' }]);
});

test('sortByDiscoveredDesc orders newest first', () => {
  const sites = [{ discovered_at: '2026-07-01' }, { discovered_at: '2026-07-14' }];
  const sorted = sortByDiscoveredDesc(sites);
  assert.equal(sorted[0].discovered_at, '2026-07-14');
});

test('scaleTagLabel maps known tags to Korean labels', () => {
  assert.equal(scaleTagLabel('large'), '대규모');
  assert.equal(scaleTagLabel('small'), '소규모');
});

test('scaleTagLabel throws on unknown tag', () => {
  assert.throws(() => scaleTagLabel('medium'));
});

test('cardHtml renders address, summary, badge label, and a link to the site page', () => {
  const site = {
    slug: '2026-07-14-sample01',
    address: '서울특별시 강남구 테헤란로 123',
    summary: '테헤란로 소재 대규모 택지조성 공사장으로 현재 굴착 단계',
    scale_tag: 'large',
    discovered_at: '2026-07-14',
  };
  const html = cardHtml(site);
  assert.match(html, /sites\/2026-07-14-sample01\.html/);
  assert.match(html, /테헤란로 123/);
  assert.match(html, /굴착 단계/);
  assert.match(html, /대규모/);
});

test('cardHtml escapes HTML-significant characters in address and summary', () => {
  const site = {
    slug: '2026-07-14-sample01',
    address: 'A&B <신축> "현장"',
    summary: '<script>alert(1)</script>',
    scale_tag: 'large',
    discovered_at: '2026-07-14',
  };
  const html = cardHtml(site);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /A&amp;B &lt;신축&gt; &quot;현장&quot;/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
});
