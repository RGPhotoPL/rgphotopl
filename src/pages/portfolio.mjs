import { P, CATS, img } from '../photos.mjs';

// Hand-mixed order so the "all" view doesn't clump by session.
// Newest work (ig…) leads; older sessions fill in behind it.
const order = [
  'ig3', 'ig39', 'ig12', 'ig18', 'ig6', 'ig2', 'ig40', 'ig8', 'ig66', 'ig22',
  'ig51', 187, 'ig14', 'ig67', 'ig62', 143, 'ig44', 'ig9', 'ig120', 'ig26',
  154, 'ig38', 'ig56', 189, 'ig16', 'ig1', 'ig20', 'ig61', 409, 'ig68',
  'ig84', 175, 'ig7', 141, 'ig52', 'ig64', 152, 183, 'ig82', 'ig27',
  'ig105', 184, 406, 'ig5', 139, 151, 'ig76', 180, 166, 'ig24',
  134, 'ig85', 145, 163, 196, 'ig80', 140, 149, 408, 'ig133',
  20, 188, 161, 153, 172, 177,
];

const count = (cat) => order.filter((id) => P[id].cat === cat).length;
const pad = (n) => String(n).padStart(2, '0');

export default () => ({
  file: 'portfolio.html',
  slug: 'portfolio',
  title: 'Portfolio — RG Photo',
  desc: 'Portfolio Radosława Kolasy: portrety artystyczne, sesje narzeczeńskie, zdjęcia wizerunkowe i reklamowe.',
  body: `
<section class="page-head">
  <div class="wrap page-head__grid">
    <p class="label">(Portfolio)</p>
    <h1 class="display page-head__title">Kadry</h1>
    <p class="page-head__lead">Wybór zdjęć z ostatnich sesji. Kliknij kadr, żeby zobaczyć go w całości — strzałki na klawiaturze przełączają zdjęcia.</p>
  </div>
</section>

<section class="pf">
  <div class="wrap">
    <div class="pf__filters" role="group" aria-label="Filtruj portfolio">
      <button type="button" class="chip is-active" data-filter="all" aria-pressed="true">Wszystko <sup>${pad(order.length)}</sup></button>
      ${Object.entries(CATS).map(([key, label]) =>
        `<button type="button" class="chip" data-filter="${key}" aria-pressed="false">${label} <sup>${pad(count(key))}</sup></button>`).join('\n      ')}
    </div>

    <div class="pf__grid" data-gallery>
      ${order.map((id) => {
        const p = P[id];
        return `<a class="pf__item" href="${p.l.src}" data-cat="${p.cat}" data-cap="${CATS[p.cat]} — ${p.alt}" style="--ar:${p.l.w}/${p.l.h}">${img(id, { sizes: '(min-width: 1100px) 31vw, (min-width: 640px) 46vw, 92vw' })}<span class="pf__tag">${CATS[p.cat]}</span></a>`;
      }).join('\n      ')}
    </div>
  </div>
</section>
`,
});
