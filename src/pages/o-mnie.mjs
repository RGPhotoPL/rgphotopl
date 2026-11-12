import { img } from '../photos.mjs';

const areas = [
  ['Fotografia', 'Portrety, sesje narzeczeńskie, zdjęcia wizerunkowe i reklamowe — w plenerze, we wnętrzach i w studiu.'],
  ['Szkolenia', 'Indywidualne zajęcia z podstaw fotografii i obsługi sprzętu, prowadzone na Twoim aparacie.'],
  ['Doradztwo', 'Pomagam dobrać aparat, obiektywy i oświetlenie do tego, co chcesz fotografować lub filmować.'],
  ['Sprzęt foto i wideo', 'Zajmuję się także handlem sprzętem fotograficznym i filmowym, więc wiem, co faktycznie sprawdza się w pracy.'],
];

export default ({ arrow }) => ({
  file: 'o-mnie.html',
  slug: 'o-mnie',
  title: 'O mnie — RG Photo',
  desc: 'Radosław Kolasa — fotograf z ponad dziesięcioletnim doświadczeniem. Fotografia, szkolenia, doradztwo i sprzęt.',
  body: `
<section class="about-hero">
  <div class="wrap about-hero__grid">
    <div class="about-hero__media reveal">
      ${img(486, { sizes: '(min-width: 900px) 38vw, 92vw', eager: true })}
      <span class="vf" aria-hidden="true"></span>
    </div>
    <div class="about-hero__body">
      <p class="label">(O mnie)</p>
      <h1 class="display about-hero__title">Radosław<br>Kolasa</h1>
      <p class="about-hero__lead">Od ponad dziesięciu lat związany jestem z fotografią. Aktywnie działam jako fotograf, a także zajmuję się doradztwem, szkoleniami oraz handlem w zakresie fotografii i filmu.</p>
      <p>Najbardziej lubię pracę z ludźmi: portret, w którym ktoś rozpoznaje siebie, albo sesję pary, która po kwadransie zapomina o aparacie. Dużo fotografuję nocą i w zastanym świetle — neony, witryny i uliczne lampy to moje ulubione studio.</p>
      <p>Moi klienci cenią sobie indywidualny styl oraz umiejętność dopasowania zdjęć do ich oczekiwań i potrzeb. Staram się, żeby każda współpraca była prosta: konkretny plan, spokojna sesja i zdjęcia oddane w terminie.</p>
      <div class="about-hero__cta">
        <a class="btn btn--solid" href="kontakt.html">Napisz do mnie</a>
        <a class="link-arrow" href="portfolio.html">Zobacz zdjęcia ${arrow}</a>
      </div>
    </div>
  </div>
</section>

<section class="areas sec">
  <div class="wrap">
    <header class="sec-head reveal">
      <p class="label">(Czym się zajmuję)</p>
      <h2 class="display sec-head__title">Cztery<br>obszary</h2>
    </header>
    <ol class="areas__list">
      ${areas.map(([t, d], i) => `<li class="reveal"><span class="areas__no">${String(i + 1).padStart(2, '0')}</span><h3 class="display">${t}</h3><p>${d}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="strip">
  <div class="strip__row">
    <div class="strip__item reveal">${img('ig120', { sizes: '(min-width: 900px) 25vw, 50vw' })}</div>
    <div class="strip__item strip__item--wide reveal">${img('ig24', { sizes: '(min-width: 900px) 50vw, 100vw' })}</div>
    <div class="strip__item reveal">${img('ig84', { sizes: '(min-width: 900px) 25vw, 50vw' })}</div>
  </div>
</section>

<section class="quote sec">
  <div class="wrap">
    <p class="label reveal">(Zasada)</p>
    <p class="display quote__text reveal">Najpierw słucham.<br>Potem naciskam spust.</p>
  </div>
</section>
`,
});
