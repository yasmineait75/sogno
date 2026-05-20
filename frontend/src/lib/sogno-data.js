// Sogno — Italian Restaurant Data

export const SOGNO = {
  name: "Sogno",
  tagline: "Ristorante Italiano  •  Trocadéro",
  address: "42 Rue de l'Amiral Hamelin, 75016 Paris",
  metro: "Boissière (ligne 6)  •  Trocadéro (lignes 6/9)",
  phone: "+33 1 47 04 02 02",
  email: "ciao@sogno-paris.fr",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.7!2d2.2893801!3d48.8682373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fa72d70a445%3A0xd230f5ec2d7c1ebc!2sSogno!5e0!3m2!1sfr!2sfr!4v1700000000000",
};

export const SOGNO_HOURS = [
  { day: "Lundi", value: "12h00 – 14h30  •  19h00 – 23h00" },
  { day: "Mardi", value: "12h00 – 14h30  •  19h00 – 23h00" },
  { day: "Mercredi", value: "12h00 – 14h30  •  19h00 – 23h00" },
  { day: "Jeudi", value: "12h00 – 14h30  •  19h00 – 23h30" },
  { day: "Vendredi", value: "12h00 – 14h30  •  19h00 – 23h30" },
  { day: "Samedi", value: "19h00 – 23h30" },
  { day: "Dimanche", value: "Fermé" },
];

export const SOGNO_MEDIA = {
  hero: "https://static.prod-images.emergentagent.com/jobs/95198ab9-cbd3-4cee-badb-5ac4f05ec298/images/de62324c126518fce85614b6fec3c8679da6a7c781b0c4eb87279857fbb1cf8a.png",
  terrace: "https://static.prod-images.emergentagent.com/jobs/95198ab9-cbd3-4cee-badb-5ac4f05ec298/images/4c0414d0b4a5be4a9faeabb483e3724ff1a29523455ca7c17316c334bc836dc0.png",
  lemons: "https://static.prod-images.emergentagent.com/jobs/95198ab9-cbd3-4cee-badb-5ac4f05ec298/images/62b296b3937c99c07d03c8f8d5ae556ddadd1217ac3e55c68322fa73621d0cf5.png",
  wine: "https://static.prod-images.emergentagent.com/jobs/95198ab9-cbd3-4cee-badb-5ac4f05ec298/images/bc554cc7e0b3d75853b8e8f3dc13772e4acee8cf90638a593ba5f967dff13b8a.png",
  // Photos authentiques des plats du restaurant Sogno
  dishes: {
    calamars: "/CALAMARS.jpeg",
    crevette: "/CREVETTE.jpeg",
    lasagne: "/LASAGNE.jpeg",
    palourdes: "/PALOURDES.jpeg",
    pistache: "/PISTACHE.jpeg",
    poulet: "/POULET.jpeg",
    tiramisu: "/TIRAMISU.jpeg",
    uovo: "/UOVO.jpeg",
    vitello: "/VITELLO.jpeg",
  },
};

export const SOGNO_ANTIPASTI = [
  { name: "Burrata di Puglia", nameFr: "Burrata des Pouilles", desc: "Burrata des Pouilles, crème et dés de potiron fondants, châtaignes, chou kale sauté — équilibre parfait entre onctuosité et saveurs de saison", price: "19" },
  { name: "Vitello tonnato", nameFr: "Veau, sauce au thon", desc: "Fines tranches de noix de veau, crème de thon et de câpres — douce, équilibrée et pleine de caractère", price: "18" },
  { name: "Frittura di calamari e zucchine", nameFr: "Friture de calamars et courgettes", desc: "Beignets de calamars et courgettes dorés à la perfection, légers et croustillants, filet de citron et sauce tartare maison — un parfum de Méditerranée", price: "18" },
  { name: "Uovo alla Valtellina", nameFr: "Œuf parfait à la Valtellina", desc: "Œuf parfait au cœur coulant, crème onctueuse de pecorino, speck de Valtellina, noisettes torréfiées", price: "16" },
  { name: "Uovo cotto a bassa temperatura", nameFr: "Œuf parfait basse température", desc: "Œuf parfait au cœur coulant, champignons de saison sautés à la ciboulette, mousse de scamorza fumée — un jeu subtil de textures et saveurs", price: "15" },
  { name: "Prosciutto di Parma", nameFr: "Jambon de Parme 24 mois", desc: "Jambon de Parme affiné 24 mois, focaccia tiède", price: "16" },
  { name: "Assortimento di salumi italiani", nameFr: "Assortiment de charcuteries italiennes", desc: "Prosciutto di Parma affiné 24 mois, Spianata piccante, Mortadella délicatement parfumée — assortiment généreux à partager (ou pas), idéal avec un bon verre de vin", price: "22" },
  { name: "Gamberi alla 'nduja e stracciatella", nameFr: "Crevettes à la 'nduja et stracciatella", desc: "Crevettes délicatement préparées, crème de 'nduja de Sperlinga, stracciatella des Pouilles, basilic frais — équilibre parfait entre intensité, douceur et fraîcheur", price: "22" },
];

export const SOGNO_PRIMI = [
  { name: "Orecchiette alla crema di Taleggio", nameFr: "Orecchiette à la crème de Taleggio", desc: "Orecchiette enrobées d'une crème fondante de Taleggio, sublimées par des noix au romarin et le croustillant du chou kale — généreux, plein de textures", price: "21" },
  { name: "Mafalde ricce ai funghi", nameFr: "Mafalde aux champignons", desc: "Mafalde ricce à la sauce aux champignons, ciboulette, crème de caciocavallo", price: "22" },
  { name: "Linguine alle vongole", nameFr: "Linguine aux palourdes", desc: "Linguine délicatement enrobées, palourdes savoureuses, parfums marins tout en finesse — supplément bottarga di muggine pour une touche iodée intense (+6€)", price: "24" },
  { name: "Lasagna al ragù di manzo", nameFr: "Lasagne au ragoût de bœuf", desc: "Couches fondantes de pâtes, ragoût de bœuf mijoté avec patience, sauce riche et réconfortante, gratinée à la perfection — un grand classique généreux et authentique", price: "23" },
  { name: "Lasagne bianche alla Genovese con anatra brasata", nameFr: "Lasagnes blanches à la Genovese et canard braisé", desc: "Couches de pâtes fraîches, sauce Genovese longuement mijotée, canard fondant, crème onctueuse gratinée au four jusqu'à obtenir une croûte dorée — généreuses, fondantes et intensément savoureuses", price: "26" },
  { name: "Sedanini al pomodoro con melanzane", nameFr: "Sedanini à la tomate et aubergines", desc: "Sauce tomate mijotée, aubergines fondantes, câpres délicatement salines et thon frais cuit lentement dans la sauce — vibrant, parfumé, profondément méditerranéen", price: "22" },
];

export const SOGNO_SECONDI = [
  { name: "Filetto di pesce del giorno", nameFr: "Filet de poisson du jour", desc: "Filet de poisson du jour délicatement saisi, légumes de saison colorés et savoureux — une cuisine simple, précise et respectueuse du produit", price: "28" },
  { name: "Suprema di pollo alla crema di tartufo nero", nameFr: "Suprême de volaille à la crème de truffe noire", desc: "Suprême de volaille farci à la crème de truffe noire, chou-fleur rôti, crème de chou-fleur caramélisée, noisettes croquantes — jeu subtil entre profondeur, douceur et textures", price: "28" },
  { name: "Ossobuco fondente", nameFr: "Ossobuco fondant", desc: "Ossobuco fondant, purée de pommes de terre, sauce gremolata", price: "29" },
  { name: "Giardino d'inverno", nameFr: "Jardin d'hiver", desc: "Légumes de saison, salade d'herbes fraîches, huile d'olive verte", price: "19" },
];

export const SOGNO_DOLCI = [
  { name: "Tiramisù tradizionale", nameFr: "Tiramisu traditionnel", desc: "Biscuits délicatement imbibés de café, crème mascarpone onctueuse, voile généreux de cacao — fondant, intense, préparé dans le respect de la tradition", price: "13" },
  { name: "Panna cotta alla pera e caramello salato", nameFr: "Panna cotta poire et caramel salé", desc: "Panna cotta délicatement vanillée, coulis de poire fraîche, croccante au caramel salé — fondante, fraîche, légèrement croquante", price: "10" },
  { name: "Panna cotta, confettura di fichi e noci", nameFr: "Panna cotta, confiture de figue et noix", desc: "Panna cotta délicatement fondante, confiture de figue maison, noix fraîches pour une touche croquante — équilibre entre gourmandise et finesse", price: "10" },
  { name: "Passione Cioccolato", nameFr: "Passion chocolat", desc: "Crumble au chocolat, glace au chocolat, mousse au chocolat relevée d'une touche de fleur de sel — profond, intense et terriblement gourmand", price: "12" },
  { name: "Pera al profumo di vaniglia", nameFr: "Poire au parfum de vanille", desc: "Poire pochée au sirop de vanille, crème de ricotta et miel, sauce caramel au beurre salé tiède", price: "14" },
  { name: "Cannolo siciliano destrutturato", nameFr: "Cannolo sicilien déstructuré", desc: "Interprétation moderne d'un classique sicilien : mousse de ricotta à la vanille, glace pistache onctueuse, cialda croustillante — un jeu de textures, températures et saveurs", price: "12" },
];

export const SOGNO_CAVE = [
  { name: "Barolo DOCG  •  Gaja", desc: "Piémont — Nebbiolo 100%, profond et complexe", price: "120" },
  { name: "Brunello di Montalcino  •  Banfi", desc: "Toscane — sangiovese, notes de cerise et tabac", price: "95" },
  { name: "Chianti Classico Riserva", desc: "Sangiovese, élevage en fût, équilibré et soyeux", price: "55" },
  { name: "Vermentino di Sardegna", desc: "Sardaigne — blanc minéral, agrumes et fleurs blanches", price: "45" },
  { name: "Franciacorta Brut", desc: "Lombardie — bulles fines, méthode champenoise", price: "75" },
  { name: "Negroni signature  •  Sogno", desc: "Campari, vermouth rosso, gin infusé au basilic", price: "14" },
  { name: "Spritz Aperol", desc: "Aperol, prosecco, soda, tranche d'orange", price: "12" },
  { name: "Espresso Martini", desc: "Vodka, liqueur de café, espresso fraîchement extrait", price: "14" },
];

export const SOGNO_TIME_SLOTS = [
  "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00",
  "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45",
  "21:00", "21:15", "21:30", "21:45", "22:00",
];
