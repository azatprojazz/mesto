const teriberka = new URL('../images/place-teriberka.jpg', import.meta.url);
const ruskeala = new URL('../images/place-ruskeala.jpg', import.meta.url);
const elbrus = new URL('../images/place-elbrus.jpg', import.meta.url);
const baykal = new URL('../images/place-baykal.jpg', import.meta.url);
const bashkiriya = new URL('../images/place-bashkiriya.jpg', import.meta.url);
const altay = new URL('../images/place-altay.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Териберка',
    link: teriberka,
  },
  {
    name: 'Рускеала',
    link: ruskeala,
  },
  {
    name: 'Эльбрус',
    link: elbrus,
  },
  {
    name: 'Байкал',
    link: baykal,
  },
  {
    name: 'Башкирия',
    link: bashkiriya,
  },
  {
    name: 'Алтай',
    link: altay,
  },
];

export default initialCards;
