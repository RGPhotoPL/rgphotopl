import { img } from '../photos.mjs';

const offers = [
  {
    slug: 'portrety', name: 'Portrety artystyczne', big: 'ig14', small: 'ig62',
    lead: 'Sesja, w której punktem wyjścia jesteś Ty — a nie gotowy schemat. Wspólnie wybieramy klimat: neon i miasto nocą, surowa ulica albo spokojne studio.',
    list: ['Rozmowa i wspólny pomysł na sesję', 'Około 1,5 godziny zdjęć w wybranym miejscu', '15 zdjęć po autorskiej obróbce', 'Galeria online do wyboru kadrów'],
    meta: [['Cena', 'od 450 zł'], ['Czas', 'ok. 1,5 godz.'], ['Zdjęcia', '15 +']],
  },
  {
    slug: 'narzeczenskie', name: 'Sesje narzeczeńskie', big: 139, small: 141,
    lead: 'Bez ustawiania i sztucznych póz. Idziemy na spacer, rozmawiamy, a ja fotografuję to, co dzieje się między Wami. Zdjęcia sprawdzą się w zaproszeniach, albumie i na ścianie.',
    list: ['Pomoc w wyborze miejsca i pory dnia', 'Około 2 godzin zdjęć w plenerze', '30 zdjęć po autorskiej obróbce', 'Pliki do druku i do internetu'],
    meta: [['Cena', 'od 650 zł'], ['Czas', 'ok. 2 godz.'], ['Zdjęcia', '30 +']],
  },
  {
    slug: 'biznes', name: 'Biznes i wizerunek', big: 'ig39', small: 'ig44',
    lead: 'Portrety na LinkedIna, stronę firmy, do prezentacji i mediów. Spójne zdjęcia dla jednej osoby albo całego zespołu — w biurze, w plenerze lub w studiu.',
    list: ['Krótka konsultacja: gdzie i do czego trafią zdjęcia', 'Sesja indywidualna lub zdjęcia zespołu', 'Naturalny retusz, spójna kolorystyka', 'Licencja na wykorzystanie firmowe'],
    meta: [['Cena', 'od 350 zł'], ['Czas', 'od 45 min'], ['Zdjęcia', '5 +']],
  },
  {
    slug: 'reklama', name: 'Fotografia reklamowa', big: 152, small: 'ig18',
    lead: 'Zdjęcia produktów, dań i wnętrz, które pracują w menu, w social mediach i w kampaniach. Zaczynamy od briefu, kończymy na plikach gotowych do publikacji.',
    list: ['Brief i moodboard przed zdjęciami', 'Realizacja w lokalu, plenerze lub studiu', 'Obróbka i formaty pod konkretne kanały', 'Licencja na wykorzystanie komercyjne'],
    meta: [['Cena', 'wycena indywidualna'], ['Czas', 'wg projektu'], ['Zdjęcia', 'wg projektu']],
  },
];

const steps = [
  ['Rozmowa', 'Piszesz lub dzwonisz. Ustalamy, do czego potrzebujesz zdjęć i jaki klimat Ci odpowiada.'],
  ['Plan', 'Proponuję miejsce, porę i stylistykę. Dostajesz konkretną wycenę i termin.'],
  ['Sesja', 'Spotykamy się na zdjęciach. Prowadzę Cię przez całość — nie musisz umieć pozować.'],
  ['Selekcja i obróbka', 'Wybierasz kadry w galerii online, a ja je dopracowuję i przekazuję gotowe pliki.'],
];

const faq = [
  ['Ile czeka się na zdjęcia?', 'Zwykle do 14 dni od sesji. Przy zdjęciach reklamowych termin ustalamy razem z zakresem prac.'],
  ['Nie lubię pozować — co wtedy?', 'To normalne. Zamiast ustawiać, podpowiadam drobne rzeczy i daję czas na oswojenie się z aparatem. Najlepsze kadry zwykle powstają po pierwszych dwudziestu minutach.'],
  ['Czy pomagasz w wyborze miejsca i stylizacji?', 'Tak. Przed sesją dostajesz ode mnie kilka propozycji miejsc i krótkie wskazówki dotyczące ubioru.'],
  ['Czy dojeżdżasz na sesje?', 'Tak, pracuję także wyjazdowo. Koszt dojazdu ustalamy indywidualnie przy rezerwacji.'],
  ['Jak zarezerwować termin?', 'Napisz przez formularz, na kontakt@rgphoto.pl albo zadzwoń: 513 453 933. Termin potwierdzam po krótkiej rozmowie.'],
];

export default ({ arrow }) => ({
  file: 'oferta.html',
  slug: 'oferta',
  title: 'Oferta — RG Photo',
  desc: 'Oferta RG Photo: portrety artystyczne, sesje narzeczeńskie, zdjęcia biznesowe i wizerunkowe oraz fotografia reklamowa.',
  body: `
<section class="page-head">
  <div class="wrap page-head__grid">
    <p class="label">(Oferta)</p>
    <h1 class="display page-head__title">Oferta</h1>
    <p class="page-head__lead">Cztery rodzaje sesji, jedna zasada: zdjęcia mają pasować do Ciebie i do tego, gdzie będą używane. Podane ceny są punktem wyjścia — ostateczną wycenę dostajesz po krótkiej rozmowie.</p>
  </div>
  <nav class="wrap anchor-nav" aria-label="Rodzaje sesji">
    ${offers.map((o, i) => `<a href="#${o.slug}"><span>${String(i + 1).padStart(2, '0')}</span>${o.name}</a>`).join('\n    ')}
  </nav>
</section>

${offers.map((o, i) => `
<section class="offer${i % 2 ? ' offer--flip' : ''}" id="${o.slug}">
  <div class="wrap offer__grid">
    <div class="offer__media reveal">
      <div class="offer__big">${img(o.big, { sizes: '(min-width: 900px) 40vw, 92vw' })}<span class="vf" aria-hidden="true"></span></div>
      <div class="offer__small">${img(o.small, { sizes: '(min-width: 900px) 18vw, 40vw' })}</div>
    </div>
    <div class="offer__body">
      <p class="label reveal">${String(i + 1).padStart(2, '0')} / ${String(offers.length).padStart(2, '0')}</p>
      <h2 class="display offer__title reveal">${o.name}</h2>
      <p class="offer__lead reveal">${o.lead}</p>
      <ul class="ticks reveal">
        ${o.list.map((t) => `<li>${t}</li>`).join('\n        ')}
      </ul>
      <dl class="meta reveal">
        ${o.meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n        ')}
      </dl>
      <a class="btn btn--solid reveal" href="kontakt.html?temat=${o.slug}">Zapytaj o termin</a>
    </div>
  </div>
</section>`).join('')}

<section class="steps sec">
  <div class="wrap">
    <header class="sec-head reveal">
      <p class="label">(Współpraca)</p>
      <h2 class="display sec-head__title">Jak to<br>wygląda</h2>
    </header>
    <ol class="steps__list">
      ${steps.map(([t, d], i) => `<li class="reveal"><span class="steps__no">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="faq sec">
  <div class="wrap faq__grid">
    <header class="reveal">
      <p class="label">(Pytania)</p>
      <h2 class="display faq__title">Zanim<br>napiszesz</h2>
    </header>
    <div class="faq__list reveal">
      ${faq.map(([q, a]) => `<details><summary><span>${q}</span><i aria-hidden="true"></i></summary><p>${a}</p></details>`).join('\n      ')}
    </div>
  </div>
</section>
`,
});
