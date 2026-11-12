import { img } from '../photos.mjs';

const courses = [
  {
    slug: 'podstawy', name: 'Podstawy fotografii',
    lead: 'Dla osób, które chcą wreszcie wyjść z trybu auto i rozumieć, dlaczego zdjęcie wyszło tak, a nie inaczej.',
    meta: [['Czas', '4 godziny'], ['Forma', 'indywidualnie lub w parze'], ['Cena', '450 zł']],
    program: ['Trójkąt ekspozycji: przysłona, czas, ISO', 'Tryby P, A, S, M — kiedy który', 'Ostrość i autofokus w praktyce', 'Kompozycja i światło zastane', 'Ćwiczenia w plenerze z omówieniem zdjęć'],
  },
  {
    slug: 'sprzet', name: 'Obsługa sprzętu',
    lead: 'Masz aparat, ale korzystasz z ułamka jego możliwości? Ustawiamy go pod Ciebie i przechodzimy przez wszystko, co warto znać.',
    meta: [['Czas', '3 godziny'], ['Forma', 'na Twoim sprzęcie'], ['Cena', '350 zł']],
    program: ['Konfiguracja aparatu pod Twój sposób pracy', 'Menu, przyciski funkcyjne, własne ustawienia', 'Obiektywy — co do czego', 'Lampy, statywy i stabilizacja', 'Pliki RAW i kopie zapasowe'],
  },
  {
    slug: 'konsultacje', name: 'Konsultacje ogólne',
    lead: 'Spotkanie na dowolny temat: zakup sprzętu, przegląd portfolio, pierwsze zlecenia albo obróbka. Ty przynosisz pytania, ja odpowiedzi.',
    meta: [['Czas', '60–90 minut'], ['Forma', 'online lub na żywo'], ['Cena', '200 zł']],
    program: ['Dobór aparatu i obiektywów do budżetu', 'Przegląd i omówienie Twoich zdjęć', 'Wycena i pierwsze zlecenia', 'Obróbka — od selekcji do eksportu', 'Plan dalszego rozwoju'],
  },
];

export default ({ arrow }) => ({
  file: 'szkolenia.html',
  slug: 'szkolenia',
  title: 'Szkolenia — RG Photo',
  desc: 'Indywidualne szkolenia fotograficzne: podstawy fotografii, obsługa sprzętu i konsultacje. Prowadzi Radosław Kolasa.',
  body: `
<section class="page-head page-head--media">
  <div class="wrap page-head__grid">
    <p class="label">(Szkolenia)</p>
    <h1 class="display page-head__title">Szkolenia</h1>
    <p class="page-head__lead">Indywidualne zajęcia z aparatem w ręku. Pracujemy na Twoim sprzęcie i na tematach, które Cię interesują — w tempie, które pozwala wszystko przećwiczyć.</p>
  </div>
  <div class="wrap">
    <div class="band reveal">
      ${img(563, { sizes: '100vw' })}
      <span class="vf" aria-hidden="true"></span>
    </div>
  </div>
</section>

<section class="courses">
  <div class="wrap">
    ${courses.map((c, i) => `
    <article class="course" id="${c.slug}">
      <div class="course__no reveal"><span>${String(i + 1).padStart(2, '0')}</span></div>
      <div class="course__main">
        <h2 class="display course__title reveal">${c.name}</h2>
        <p class="course__lead reveal">${c.lead}</p>
        <dl class="meta reveal">
          ${c.meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n          ')}
        </dl>
      </div>
      <div class="course__program reveal">
        <p class="label">Program</p>
        <ol>
          ${c.program.map((p) => `<li>${p}</li>`).join('\n          ')}
        </ol>
        <a class="link-arrow" href="#zapisy" data-pick-course="${c.name}">Zapisz się ${arrow}</a>
      </div>
    </article>`).join('')}
  </div>
</section>

<section class="signup sec" id="zapisy">
  <div class="wrap signup__grid">
    <div class="signup__intro">
      <p class="label reveal">(Zapisy)</p>
      <h2 class="display signup__title reveal">Umów<br>szkolenie</h2>
      <p class="reveal">Napisz, co chcesz przećwiczyć i jakim sprzętem fotografujesz. Odezwę się z propozycją terminu.</p>
      <div class="signup__media reveal">${img(221, { sizes: '(min-width: 900px) 30vw, 92vw' })}</div>
    </div>
    <form class="form reveal" data-demo-form novalidate>
      <div class="field">
        <label for="s-imie">Imię</label>
        <input id="s-imie" name="imie" type="text" autocomplete="given-name" required>
      </div>
      <div class="field">
        <label for="s-email">E-mail</label>
        <input id="s-email" name="email" type="email" autocomplete="email" required>
      </div>
      <div class="field">
        <label for="s-kurs">Szkolenie</label>
        <select id="s-kurs" name="szkolenie" data-course-select>
          ${courses.map((c) => `<option>${c.name}</option>`).join('\n          ')}
        </select>
      </div>
      <div class="field">
        <label for="s-sprzet">Twój sprzęt <span>(opcjonalnie)</span></label>
        <input id="s-sprzet" name="sprzet" type="text" placeholder="np. model aparatu i obiektyw">
      </div>
      <div class="field field--full">
        <label for="s-msg">Wiadomość</label>
        <textarea id="s-msg" name="wiadomosc" rows="5" required></textarea>
      </div>
      <div class="form__foot">
        <button class="btn btn--solid" type="submit">Wyślij zgłoszenie</button>
        <p class="form__status" role="status" data-form-status></p>
      </div>
    </form>
  </div>
</section>
`,
});
