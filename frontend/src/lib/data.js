// Static content for Le Jean Michel Breizh

export const RESTAURANT = {
  name: "Le Jean Michel Breizh",
  tagline: "Crêperie & Bistrot Breton",
  address: "7 rue Gros, 75016 Paris",
  metro: "Mirabeau (Ligne 10) • Église d'Auteuil (Ligne 10)",
  phone: "+33 1 45 27 00 00",
  email: "bonjour@lejeanmichelbreizh.fr",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.7!2d2.2774519!3d48.8512753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671130d42414f%3A0xf3df531ca1cd10a!2sLe%20Jean%20Michel%20Breizh!5e0!3m2!1sfr!2sfr!4v1700000000000",
};

export const HOURS = [
  { day: "Lundi", value: "Fermé" },
  { day: "Mardi", value: "12h15 – 14h15  •  19h30 – 22h00" },
  { day: "Mercredi", value: "12h15 – 14h15  •  19h30 – 22h00" },
  { day: "Jeudi", value: "12h15 – 14h15  •  19h30 – 22h00" },
  { day: "Vendredi", value: "12h15 – 14h15  •  19h30 – 22h00" },
  { day: "Samedi", value: "13h00 – 21h30" },
  { day: "Dimanche", value: "Fermé" },
];

export const MEDIA = {
  heroBg:
    "https://static.prod-images.emergentagent.com/jobs/95198ab9-cbd3-4cee-badb-5ac4f05ec298/images/72da41271f25de712af32a3abd569433dbfd34bc69043512e4c811f2e9bf310f.png",
  granite:
    "https://static.prod-images.emergentagent.com/jobs/95198ab9-cbd3-4cee-badb-5ac4f05ec298/images/d1e6e97b7ec41730026aa4424dc531e8c051bcef2f2c1ff53a91500b5f22c635.png",
  ermine:
    "https://static.prod-images.emergentagent.com/jobs/95198ab9-cbd3-4cee-badb-5ac4f05ec298/images/63105c6d07aa13f83b521db5c35edb6aa02547be819a28d44ff36a9505e73144.png",
  galette1:
    "https://images.unsplash.com/photo-1643410454503-d70d0184b1ca?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwzfHxmcmVuY2glMjBnYWxldHRlJTIwY3JlcGV8ZW58MHx8fHwxNzc5MTEyOTY2fDA&ixlib=rb-4.1.0&q=85",
  galette2:
    "https://images.unsplash.com/photo-1645676456446-79c5a8aa9451?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBnYWxldHRlJTIwY3JlcGV8ZW58MHx8fHwxNzc5MTEyOTY2fDA&ixlib=rb-4.1.0&q=85",
  interior1:
    "https://images.unsplash.com/photo-1651440204216-548382747b40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwzfHxlbGVnYW50JTIwYmlzdHJvJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzc5MTEyOTY3fDA&ixlib=rb-4.1.0&q=85",
  interior2:
    "https://images.unsplash.com/photo-1583354608715-177553a4035e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmlzdHJvJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzc5MTEyOTY3fDA&ixlib=rb-4.1.0&q=85",
  oceanRocks:
    "https://images.unsplash.com/photo-1672401453298-718391001690?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwyfHxvY2VhbiUyMGdyYW5pdGUlMjByb2Nrc3xlbnwwfHx8fDE3NzkxMTI5ODN8MA&ixlib=rb-4.1.0&q=85",
};

export const SAVORY_GALETTES = [
  {
    name: "La Jean-Michel",
    desc: "Jambon de Vendée, comté affiné 18 mois, œuf miroir, persillade",
    price: "14",
  },
  {
    name: "La Saint-Malo",
    desc: "Saumon fumé maison, crème ciboulette, citron de Menton, baies roses",
    price: "17",
  },
  {
    name: "La Korrigan",
    desc: "Andouille de Guémené, oignons confits au cidre, moutarde à l'ancienne",
    price: "16",
  },
  {
    name: "La Forestière",
    desc: "Cèpes & champignons de Paris, crème de truffe, parmesan, jaune coulant",
    price: "18",
  },
  {
    name: "La Marine",
    desc: "Noix de Saint-Jacques snackées, fondue de poireaux, beurre blanc",
    price: "22",
  },
  {
    name: "La Végétale",
    desc: "Chèvre frais, courge rôtie, miel breton, noisettes torréfiées, roquette",
    price: "15",
  },
];

export const SWEET_CREPES = [
  {
    name: "La Bretonne",
    desc: "Beurre demi-sel de Bordier, sucre roux, citron pressé minute",
    price: "8",
  },
  {
    name: "La Caramel",
    desc: "Caramel au beurre salé maison, fleur de sel de Guérande, crème crue",
    price: "10",
  },
  {
    name: "La Suzette",
    desc: "Beurre d'orange, Grand Marnier flambé, zestes confits",
    price: "12",
  },
  {
    name: "La Penn-ar-Bed",
    desc: "Chocolat noir 70%, poire pochée au cidre, glace vanille de Madagascar",
    price: "12",
  },
  {
    name: "La Fraise Plougastel",
    desc: "Fraises de Plougastel, mascarpone vanillé, basilic frais (saison)",
    price: "13",
  },
  {
    name: "La Far",
    desc: "Inspiration far breton aux pruneaux d'Agen, rhum ambré, crème glacée",
    price: "11",
  },
];

export const DRINKS = [
  { name: "Cidre brut fermier — Cornouaille AOP", desc: "Bolée 25cl", price: "5,5" },
  { name: "Cidre doux artisanal — Domaine Manoir du Kinkiz", desc: "Bolée 25cl", price: "5,5" },
  { name: "Kir Breton", desc: "Cidre & crème de cassis", price: "6" },
  { name: "Chouchen de Quimper", desc: "Hydromel breton, servi frais", price: "7" },
  { name: "Lambig", desc: "Eau-de-vie de cidre, 4cl", price: "8" },
];

export const TIME_SLOTS = [
  "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45",
  "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15",
];
