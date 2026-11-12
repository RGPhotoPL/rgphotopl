import { img } from '../photos.mjs';

const services = [
  ['portrety', 'Portrety artystyczne', 'Neon, ulica, studio albo Twoje ulubione miejsce. Portret, który wygląda jak Ty — tylko w najlepszym świetle.', 'ig12'],
  ['narzeczenskie', 'Sesje narzeczeńskie', 'Spokojny spacer zamiast pozowania. Naturalne kadry we dwoje — do zaproszeń, albumu i na ścianę.', 143],
  ['biznes', 'Biznes i wizerunek', 'Zdjęcia na LinkedIna, stronę firmy i do mediów. Profesjonalnie, ale bez sztywności.', 'ig40'],
  ['reklama', 'Fotografia reklamowa', 'Produkty, gastronomia, lokale. Zdjęcia do menu, social mediów i kampanii.', 154],
];

const work = [
  ['ig3', 'Portret', 'Nad jeziorem'],
  ['ig18', 'Reklama', 'Motoryzacja'],
  ['ig39', 'Wizerunek', 'Garnitur'],
  [143, 'Pary', 'Stare miasto'],
  ['ig6', 'Portret', 'Złota godzina'],
];

const LEAD = 'Od ponad dziesięciu lat fotografuję ludzi, marki i miejsca. Portrety, sesje narzeczeńskie, biznesowe i reklamowe — dopasowane do Ciebie, nie do szablonu.';
const cta = (arrow) => `<div class="hero__cta">
      <a class="btn btn--solid" href="kontakt.html">Zarezerwuj termin</a>
      <a class="link-arrow" href="portfolio.html">Zobacz portfolio ${arrow}</a>
    </div>`;
const INDEX = `<ol class="hero__index wrap" aria-label="Zakres usług">
    <li><span>01</span>Portrety artystyczne</li>
    <li><span>02</span>Narzeczeńskie i biznesowe</li>
    <li><span>03</span>Reklamowe</li>
    <li><span>04</span>Szkolenia</li>
  </ol>`;

function hero(arrow) {
  return `
<section class="hero">
  <div class="hero__media">
    ${img(487, { sizes: '(min-width: 900px) 75vw, 100vw', eager: true })}
  </div>
  <span class="vf hero__vf" aria-hidden="true"></span>

  <div class="hero__content wrap">
    <p class="label hero__label"><span class="dot"></span>Fotograf · szkoleniowiec · doradca</p>
    <h1 class="display hero__title">Radosław<br>Kolasa</h1>
    <p class="hero__lead">Od ponad dziesięciu lat fotografuję ludzi, marki i miejsca. Portrety, sesje narzeczeńskie, biznesowe i reklamowe — dopasowane do Ciebie, nie do szablonu.</p>
    <div class="hero__cta">
      <a class="btn btn--solid" href="kontakt.html">Zarezerwuj termin</a>
      <a class="link-arrow" href="portfolio.html">Zobacz portfolio ${arrow}</a>
    </div>
  </div>

  <ol class="hero__index wrap" aria-label="Zakres usług">
    <li><span>01</span>Portrety artystyczne</li>
    <li><span>02</span>Narzeczeńskie i biznesowe</li>
    <li><span>03</span>Reklamowe</li>
    <li><span>04</span>Szkolenia</li>
  </ol>
</section>
`;
}

export default ({ arrow }) => ({
  file: 'index.html',
  slug: 'home',
  title: 'RG Photo — Radosław Kolasa, fotograf',
  desc: 'Portrety artystyczne, sesje narzeczeńskie, biznesowe i reklamowe. Szkolenia i doradztwo fotograficzne. Radosław Kolasa — RG Photo.',
  body: `
${hero(arrow)}

<section class="statement sec">
  <div class="wrap statement__grid">
    <p class="label reveal">(Podejście)</p>
    <div>
      <h2 class="statement__title display reveal">Fotografia to <span class="rotator" data-rotator='["ludzie","światło","emocje","cierpliwość"]'>ludzie</span></h2>
      <div class="statement__cols reveal">
        <p>Sprzęt i technika są ważne — zajmuję się nimi zawodowo. Ale dobre zdjęcie zaczyna się wcześniej: od rozmowy o tym, kim jesteś, do czego potrzebujesz zdjęć i w jakim świetle czujesz się sobą.</p>
        <p>Moi klienci cenią indywidualny styl oraz to, że zdjęcia dopasowuję do ich oczekiwań i potrzeb. Dlatego każda sesja wygląda trochę inaczej — i dobrze.</p>
      </div>
    </div>
  </div>
</section>

<section class="work sec">
  <div class="wrap">
    <header class="sec-head reveal">
      <p class="label">(Wybrane kadry)</p>
      <h2 class="display sec-head__title">Ostatnie<br>realizacje</h2>
      <a class="link-arrow sec-head__link" href="portfolio.html">Całe portfolio ${arrow}</a>
    </header>

    <div class="work__grid">
      ${work.map(([id, cat, name], i) => `
      <a class="shot work__item work__item--${i + 1} reveal" href="portfolio.html">
        <span class="shot__frame">${img(id, { sizes: '(min-width: 900px) 42vw, 92vw' })}<span class="vf" aria-hidden="true"></span></span>
        <span class="shot__cap"><span>${String(i + 1).padStart(2, '0')}</span><span>${cat}</span><span>${name}</span></span>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="svc sec" data-svc>
  <div class="wrap">
    <header class="sec-head reveal">
      <p class="label">(Oferta)</p>
      <h2 class="display sec-head__title">Jakie zdjęcia<br>tworzę</h2>
      <a class="link-arrow sec-head__link" href="oferta.html">Poznaj pełną ofertę ${arrow}</a>
    </header>

    <div class="svc__grid">
      <ol class="svc__list">
        ${services.map(([slug, name, desc, id], i) => `
        <li class="reveal">
          <a class="svc__row${i === 0 ? ' is-active' : ''}" href="oferta.html#${slug}" data-svc-row="${i}">
            <span class="svc__no">${String(i + 1).padStart(2, '0')}</span>
            <span class="svc__name display">${name}</span>
            <span class="svc__desc">${desc}</span>
            <span class="svc__thumb">${img(id, { sizes: '96px', alt: '' })}</span>
            <span class="svc__go">${arrow}</span>
          </a>
        </li>`).join('')}
      </ol>
      <div class="svc__preview" aria-hidden="true">
        ${services.map(([, , , id], i) => `<div class="svc__img${i === 0 ? ' is-active' : ''}" data-svc-img="${i}">${img(id, { sizes: '34vw', alt: '' })}</div>`).join('\n        ')}
        <span class="vf"></span>
      </div>
    </div>
  </div>
</section>

<section class="teach sec">
  <div class="wrap teach__grid">
    <div class="teach__media reveal">
      ${img(485, { sizes: '(min-width: 900px) 55vw, 100vw' })}
      <span class="vf" aria-hidden="true"></span>
    </div>
    <div class="teach__body">
      <p class="label reveal">(Szkolenia i doradztwo)</p>
      <h2 class="display teach__title reveal">Uczę tak, jak sam chciałbym się uczyć</h2>
      <p class="reveal">Indywidualnie, na Twoim sprzęcie i na przykładach, które Cię interesują. Bez slajdów pełnych teorii — z aparatem w ręku.</p>
      <ul class="teach__list reveal">
        <li><a href="szkolenia.html#podstawy"><span>Podstawy fotografii</span><span>4 godz.</span></a></li>
        <li><a href="szkolenia.html#sprzet"><span>Obsługa sprzętu</span><span>3 godz.</span></a></li>
        <li><a href="szkolenia.html#konsultacje"><span>Konsultacje ogólne</span><span>60–90 min</span></a></li>
      </ul>
      <a class="btn btn--line reveal" href="szkolenia.html">Zobacz szkolenia</a>
    </div>
  </div>
</section>
`,
});
