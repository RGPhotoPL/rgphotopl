import { img } from '../photos.mjs';

export default ({ arrow }) => ({
  file: 'kontakt.html',
  slug: 'kontakt',
  title: 'Kontakt — RG Photo',
  desc: 'Skontaktuj się z RG Photo: telefon 513 453 933, e-mail kontakt@rgphoto.pl. Zarezerwuj termin sesji lub szkolenia.',
  body: `
<section class="page-head">
  <div class="wrap page-head__grid">
    <p class="label">(Kontakt)</p>
    <h1 class="display page-head__title">Napisz</h1>
    <p class="page-head__lead">Opowiedz w dwóch zdaniach, jakich zdjęć potrzebujesz. Odpowiadam zwykle w ciągu jednego dnia roboczego.</p>
  </div>
</section>

<section class="contact">
  <div class="wrap contact__grid">
    <div class="contact__info">
      <ul class="contact__list">
        <li class="reveal"><span class="label">Telefon</span><a href="tel:+48513453933">513 453 933</a></li>
        <li class="reveal"><span class="label">E-mail</span><a href="mailto:kontakt@rgphoto.pl">kontakt@rgphoto.pl</a></li>
        <li class="reveal"><span class="label">Facebook</span><a href="https://www.facebook.com/rgphotopl" rel="noopener">fb.com/rgphotopl</a></li>
        <li class="reveal"><span class="label">Instagram</span><a href="https://www.instagram.com/rgphoto.pl" rel="noopener">@rgphoto.pl</a></li>
      </ul>
      <div class="contact__media reveal">
        ${img(485, { sizes: '(min-width: 900px) 40vw, 92vw' })}
        <span class="vf" aria-hidden="true"></span>
      </div>
    </div>

    <form class="form contact__form reveal" data-demo-form novalidate>
      <div class="field">
        <label for="k-imie">Imię</label>
        <input id="k-imie" name="imie" type="text" autocomplete="given-name" required>
      </div>
      <div class="field">
        <label for="k-email">E-mail</label>
        <input id="k-email" name="email" type="email" autocomplete="email" required>
      </div>
      <div class="field">
        <label for="k-tel">Telefon <span>(opcjonalnie)</span></label>
        <input id="k-tel" name="telefon" type="tel" autocomplete="tel">
      </div>
      <div class="field">
        <label for="k-temat">Temat</label>
        <select id="k-temat" name="temat" data-topic-select>
          <option value="portrety">Portret artystyczny</option>
          <option value="narzeczenskie">Sesja narzeczeńska</option>
          <option value="biznes">Zdjęcia biznesowe / wizerunkowe</option>
          <option value="reklama">Fotografia reklamowa</option>
          <option value="szkolenia">Szkolenie lub konsultacja</option>
          <option value="inne">Coś innego</option>
        </select>
      </div>
      <div class="field field--full">
        <label for="k-msg">Wiadomość</label>
        <textarea id="k-msg" name="wiadomosc" rows="7" required placeholder="Jakie zdjęcia, mniej więcej kiedy i gdzie?"></textarea>
      </div>
      <div class="form__foot">
        <button class="btn btn--solid" type="submit">Wyślij wiadomość</button>
        <p class="form__status" role="status" data-form-status></p>
      </div>
    </form>
  </div>
</section>
`,
});
