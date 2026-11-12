// Photo catalog. Older work is loaded straight from the existing rgphoto.pl
// media library; newer work from Instagram is stored locally (see igMeta below).
import { readFileSync } from 'node:fs';

const BASE = 'https://rgphoto.pl/wp-content/uploads/';

// [id, file name, height of 768w variant, large w, large h, category, alt, dir?]
const rows = [
  // autor
  [487, 'DSC08003-1', 512, 1536, 1024, 'autor', 'Radosław Kolasa, portret w studiu'],
  [486, 'DSC07970-1', 1152, 1024, 1536, 'autor', 'Radosław Kolasa, sylwetka w studiu'],
  [485, 'DSC07947-1', 512, 1536, 1024, 'autor', 'Radosław Kolasa z aparatem przy oku'],
  [563, 'TloKontakt-Upscaled-2', 340, 1536, 680, 'autor', 'Radosław Kolasa fotografujący w studiu', '2025/02'],
  [221, 'DSC00151', 768, 1536, 1536, 'autor', 'Praca ze sprzętem w plenerze, w tle kamienice'],
  [134, 'DSC06688', 1152, 1024, 1536, 'ulica', 'Czarno-biały kadr uliczny, postać na przejściu dla pieszych'],
  [20, 'DSC06635', 512, 1536, 1024, 'ulica', 'Budynki we mgle o świcie'],

  // portrety
  [187, 'DSC07858', 1152, 1024, 1536, 'portret', 'Portret kobiety w niebieskim świetle neonów'],
  [189, 'DSC07997', 960, 1229, 1536, 'portret', 'Kobieta przy automacie w salonie gier, czerwono-niebieskie światło'],
  [188, 'DSC07975', 1152, 1024, 1536, 'portret', 'Mężczyzna sfotografowany z dołu w salonie gier'],
  [186, 'DSC07829', 1152, 1024, 1536, 'portret', 'Portret kobiety z długimi włosami w świetle neonów'],
  [185, 'DSC07783', 1152, 1024, 1536, 'portret', 'Kobieta w różowym świetle neonów'],
  [184, 'DSC07696', 1152, 1024, 1536, 'portret', 'Uśmiechnięta kobieta w salonie gier'],
  [183, 'DSC07597', 1152, 1024, 1536, 'portret', 'Mężczyzna pod kolorowymi świetlówkami'],
  [182, 'DSC07565', 1152, 1024, 1536, 'portret', 'Portret mężczyzny w bluzie, chłodne światło'],
  [180, 'DSC07519', 1152, 1024, 1536, 'portret', 'Czarno-biały portret przy muralu z napisem „Dzień dobry”'],
  [179, 'DSC07509', 1152, 1024, 1536, 'portret', 'Portret w kapturze na tle ulicy'],
  [178, 'DSC07477', 1152, 1024, 1536, 'portret', 'Portret na tle graffiti'],
  [177, 'DSC07471', 1152, 1024, 1536, 'portret', 'Portret w kapturze przy ścianie z graffiti'],
  [176, 'DSC08223', 1152, 1024, 1536, 'portret', 'Mężczyzna w niebieskim świetle automatów'],
  [175, 'DSC08206', 1152, 1024, 1536, 'portret', 'Kobieta z włosami podświetlonymi na różowo'],
  [173, 'DSC08181', 1152, 1024, 1536, 'portret', 'Kobieta przy stole do cymbergaja'],
  [172, 'DSC08166', 512, 1536, 1024, 'portret', 'Stół do cymbergaja w neonowym świetle'],
  [171, 'DSC08161', 1152, 1024, 1536, 'portret', 'Portret przy automatach, różowe światło'],
  [170, 'DSC08113', 1152, 1024, 1536, 'portret', 'Mężczyzna przy automacie do gier'],
  [169, 'DSC08082', 565, 1536, 1129, 'portret', 'Mężczyzna z kontrolerem w salonie gier'],
  [168, 'DSC08047', 1152, 1024, 1536, 'portret', 'Uśmiechnięty mężczyzna w zielonym świetle'],
  [167, 'DSC08018', 1152, 1024, 1536, 'portret', 'Portret mężczyzny w czerwono-niebieskim świetle'],
  [196, 'DSC02296-1', 1152, 1024, 1536, 'portret', 'Mężczyzna w garniturze i okularach, wieczorne światła miasta'],
  [194, 'DSC02395', 1152, 1024, 1536, 'portret', 'Portret mężczyzny w okularach przeciwsłonecznych o zmierzchu'],

  // wizerunek / biznes
  [409, 'DSC01779', 442, 1536, 884, 'wizerunek', 'Mężczyzna w kamizelce i krawacie na tle kamienicy'],
  [408, 'DSC01809', 960, 1229, 1536, 'wizerunek', 'Portret mężczyzny w kamizelce i okularach przeciwsłonecznych'],
  [407, 'DSC01801', 960, 1229, 1536, 'wizerunek', 'Mężczyzna przed zabytkową bramą'],
  [406, 'DSC01786', 960, 1229, 1536, 'wizerunek', 'Mężczyzna w kamizelce idący przed ozdobną bramą'],
  [166, 'P1380417', 1152, 1024, 1536, 'wizerunek', 'Mężczyzna w czarnej koszuli na ławce w ogrodzie'],
  [165, 'P1380391', 1152, 1024, 1536, 'wizerunek', 'Mężczyzna poprawiający okulary przeciwsłoneczne'],
  [163, 'P1380498', 1152, 1024, 1536, 'wizerunek', 'Portret w czarnej koszuli w ciepłym świetle'],
  [161, 'P1380474', 1152, 1024, 1536, 'wizerunek', 'Mężczyzna z książką na tle zieleni'],
  [159, 'P1380442', 1152, 1024, 1536, 'wizerunek', 'Mężczyzna w czarnej koszuli wśród zieleni'],
  [156, 'P1380436', 1152, 1024, 1536, 'wizerunek', 'Uśmiechnięty mężczyzna rozmawiający przez telefon'],

  // pary
  [143, 'DSC03556', 1152, 1024, 1536, 'pary', 'Para spacerująca po starym mieście'],
  [141, 'DSC03498', 1152, 1024, 1536, 'pary', 'Przytulona para, zbliżenie'],
  [140, 'DSC03496', 1153, 1023, 1536, 'pary', 'Para siedząca przed kamienicą'],
  [139, 'DSC03482', 1152, 1024, 1536, 'pary', 'Para obejmująca się na ulicy starego miasta'],

  // reklama
  [154, 'P1270730', 960, 1229, 1536, 'reklama', 'Czerwony koktajl z owocami w kieliszku'],
  [153, 'P1270716-1', 1152, 1024, 1536, 'reklama', 'Koktajl z cytrusami na tle świateł lokalu'],
  [152, 'P1270671', 960, 1229, 1536, 'reklama', 'Dwa koktajle na barze'],
  [151, 'P1270665', 512, 1536, 1024, 'reklama', 'Koktajl z miętą na barze'],
  [150, 'P1270633', 1152, 1024, 1536, 'reklama', 'Koktajle z lodem i miętą'],
  [149, 'P1270826', 1152, 1024, 1536, 'reklama', 'Drink z limonką w niebieskim świetle'],
  [147, 'P1270809', 1152, 1024, 1536, 'reklama', 'Drink z limonką i miętą, neonowe tło'],
  [146, 'P1270791-1', 960, 1229, 1536, 'reklama', 'Wysoki drink z limonką na ciemnym tle'],
  [145, 'P1270735', 960, 1229, 1536, 'reklama', 'Koktajl w kieliszku na tle złotych świateł'],
];

// Newer work taken from Instagram (@rgplayofficial). These are stored locally in
// site/assets/photos; sizes come from src/ig-photos.json (written by the import script).
const igMeta = {
  ig1: ['pary', 'Para w stylizacji folkowej, taniec w lesie'],
  ig2: ['pary', 'Uśmiechnięta para w stylizacji folkowej'],
  ig3: ['portret', 'Mężczyzna przykucnięty na kamieniach nad jeziorem, burzowe niebo'],
  ig5: ['portret', 'Mężczyzna w kolorowej koszuli na tle ceglanej fabryki'],
  ig6: ['portret', 'Portret pod słońce w złotym świetle, okulary i bandana'],
  ig7: ['portret', 'Mężczyzna w kaszkiecie siedzący przy zielonej ścianie'],
  ig8: ['portret', 'Kaszkiet, sweter i aparat analogowy w dłoni'],
  ig9: ['portret', 'Mężczyzna w kaszkiecie z papierosem i aparatem'],
  ig12: ['portret', 'Portret w kaszkiecie z aparatem analogowym na szyi'],
  ig14: ['portret', 'Portret w swetrze z aparatem analogowym, ciepłe światło'],
  ig16: ['portret', 'Sepiowy portret z aparatem w zamglonym kadrze'],
  ig18: ['reklama', 'Biały hatchback nocą w świetle latarni'],
  ig20: ['reklama', 'Przód samochodu z włączonymi światłami'],
  ig22: ['portret', 'Mężczyzna nad jeziorem w ciepłym świetle zachodu'],
  ig24: ['portret', 'Sylwetka nad brzegiem jeziora'],
  ig26: ['portret', 'Mężczyzna w żółtej koszuli na tle zieleni'],
  ig27: ['portret', 'Postać od tyłu na leśnej ścieżce'],
  ig38: ['portret', 'Nocny portret w garniturze przy neonowej witrynie'],
  ig39: ['wizerunek', 'Mężczyzna w garniturze na schodach ruchomych, ujęcie z góry'],
  ig40: ['wizerunek', 'Mężczyzna w garniturze zjeżdżający schodami ruchomymi'],
  ig44: ['wizerunek', 'Mężczyzna w garniturze z telefonem przed wejściem'],
  ig51: ['wizerunek', 'Mężczyzna w garniturze odpalający papierosa, zbliżenie'],
  ig52: ['wizerunek', 'Mężczyzna w kamizelce sprawdzający zegarek na ulicy'],
  ig56: ['wizerunek', 'Czarno-biały kadr na podwórku kamienicy'],
  ig61: ['portret', 'Sylwetka w kontrowym świetle nocą'],
  ig62: ['portret', 'Nocny portret w dżinsowej kurtce, światło z tyłu'],
  ig64: ['portret', 'Mężczyzna w dżinsowej kurtce na mostku nocą'],
  ig66: ['ulica', 'Peron nocą, pociąg pokryty graffiti'],
  ig67: ['reklama', 'Wnętrze kawiarni z neonem na ceglanej ścianie'],
  ig68: ['portret', 'Portret kobiety w okularach, kolorowe światła w tle'],
  ig76: ['portret', 'Postać w chuście i okularach w opuszczonym budynku'],
  ig80: ['portret', 'Uśmiechnięty mężczyzna w okularach, kadr przez liście'],
  ig82: ['wizerunek', 'Czarno-biały portret w płaszczu z walizką'],
  ig84: ['ulica', 'Sylwetka mężczyzny w przejściu, światło z góry'],
  ig85: ['portret', 'Portret kobiety w okularach i szaliku'],
  ig105: ['ulica', 'Postać w kapturze w niebieskiej mgle'],
  ig120: ['ulica', 'Wejście do metra w Warszawie nocą'],
  ig133: ['portret', 'Niskokluczowy portret kobiety z rudymi włosami'],
};
const igSizes = JSON.parse(readFileSync(new URL('./ig-photos.json', import.meta.url), 'utf8'));

export const photos = [
  ...rows.map(([id, name, mh, lw, lh, cat, alt, dir = '2025/01']) => ({
    id, cat, alt,
    m: { src: `${BASE}${dir}/${name}-768x${mh}.jpg`, w: 768, h: mh },
    l: { src: `${BASE}${dir}/${name}-${lw}x${lh}.jpg`, w: lw, h: lh },
  })),
  ...Object.entries(igMeta).map(([id, [cat, alt]]) => {
    if (!igSizes[id]) throw new Error(`Missing sizes for ${id} — re-run the Instagram import`);
    return { id, cat, alt, ...igSizes[id] };
  }),
];

export const P = Object.fromEntries(photos.map((p) => [p.id, p]));

export const LOGO = `${BASE}2025/02/Logo-Wide-White-768x151.png`;
export const ICON = `${BASE}2025/02/cropped-Sygnet-White.png`;

export const CATS = {
  portret: 'Portrety',
  wizerunek: 'Wizerunek',
  pary: 'Pary',
  reklama: 'Reklama',
  ulica: 'Ulica',
};

/** <img> with srcset for a catalog photo. */
export function img(id, { sizes = '(min-width: 900px) 50vw, 100vw', cls = '', alt, eager = false } = {}) {
  const p = P[id];
  if (!p) throw new Error(`Unknown photo ${id}`);
  return `<img${cls ? ` class="${cls}"` : ''} src="${p.m.src}" srcset="${p.m.src} ${p.m.w}w, ${p.l.src} ${p.l.w}w" sizes="${sizes}" width="${p.l.w}" height="${p.l.h}" alt="${alt ?? p.alt}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}
