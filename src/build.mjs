// Tiny static-site build: node src/build.mjs  ->  site/*.html
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { LOGO, ICON } from './photos.mjs';
import home from './pages/home.mjs';
import portfolio from './pages/portfolio.mjs';
import oferta from './pages/oferta.mjs';
import szkolenia from './pages/szkolenia.mjs';
import omnie from './pages/o-mnie.mjs';
import kontakt from './pages/kontakt.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');

const NAV = [
  ['portfolio.html', 'Portfolio'],
  ['oferta.html', 'Oferta'],
  ['szkolenia.html', 'Szkolenia'],
  ['o-mnie.html', 'O mnie'],
  ['kontakt.html', 'Kontakt'],
];

export const arrow = '<svg class="arr" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';

function layout(page) {
  const nav = NAV.map(([href, label]) =>
    `<li><a href="${href}"${href === page.file ? ' aria-current="page"' : ''}>${label}</a></li>`).join('');

  return `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${page.title}</title>
<meta name="description" content="${page.desc}">
<meta name="theme-color" content="#07090d">
<script>document.documentElement.classList.add('js')</script>
<link rel="icon" href="${ICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
</head>
<body class="page-${page.slug}">
<a class="skip" href="#tresc">Przejdź do treści</a>

<header class="site-header" data-header>
  <a class="site-header__logo" href="index.html" aria-label="RG Photo — strona główna">
    <img src="${LOGO}" width="768" height="151" alt="RG Photo">
  </a>
  <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav" data-nav-toggle>
    <span class="nav-toggle__bars" aria-hidden="true"></span>
    <span class="sr">Menu</span>
  </button>
  <nav class="site-nav" id="nav" aria-label="Główna">
    <ul>${nav}</ul>
    <a class="btn btn--line site-nav__cta" href="kontakt.html">Zarezerwuj termin</a>
  </nav>
</header>

<main id="tresc">
${page.body}
</main>

<footer class="site-footer">
  <div class="wrap">
    <div class="foot-cta">
      <p class="label">Kontakt</p>
      <a class="foot-cta__big display" href="kontakt.html">Zróbmy<br>dobre zdjęcia ${arrow}</a>
    </div>
    <div class="foot-grid">
      <div>
        <p class="label">Telefon</p>
        <a class="foot-link" href="tel:+48513453933">513 453 933</a>
      </div>
      <div>
        <p class="label">E-mail</p>
        <a class="foot-link" href="mailto:kontakt@rgphoto.pl">kontakt@rgphoto.pl</a>
      </div>
      <div>
        <p class="label">Social</p>
        <a class="foot-link" href="https://www.facebook.com/rgphotopl" rel="noopener">Facebook</a>
        <a class="foot-link" href="https://www.instagram.com/rgphoto.pl" rel="noopener">Instagram</a>
      </div>
      <div>
        <p class="label">Strony</p>
        ${NAV.map(([href, label]) => `<a class="foot-link foot-link--sm" href="${href}">${label}</a>`).join('\n        ')}
      </div>
    </div>
    <div class="foot-base">
      <span>© <span data-year>2026</span> RG Photo · Radosław Kolasa</span>
      <span class="foot-base__note">Makieta poglądowa — treści i ceny przykładowe</span>
    </div>
  </div>
</footer>

<dialog class="lightbox" data-lightbox aria-label="Podgląd zdjęcia">
  <button class="lightbox__close" type="button" data-lb-close aria-label="Zamknij">Zamknij</button>
  <button class="lightbox__nav lightbox__nav--prev" type="button" data-lb-prev aria-label="Poprzednie zdjęcie">${arrow}</button>
  <figure class="lightbox__fig">
    <img data-lb-img alt="">
    <figcaption><span data-lb-count></span><span data-lb-cap></span></figcaption>
  </figure>
  <button class="lightbox__nav lightbox__nav--next" type="button" data-lb-next aria-label="Następne zdjęcie">${arrow}</button>
</dialog>

<script src="assets/main.js" defer></script>
</body>
</html>
`;
}

await mkdir(OUT, { recursive: true });
for (const make of [home, portfolio, oferta, szkolenia, omnie, kontakt]) {
  const page = make({ arrow });
  await writeFile(join(OUT, page.file), layout(page), 'utf8');
  console.log('built', page.file);
}
