import wineOne from '../assets/Product/WINES/1_r1_c5_processed_by_imagy.png';
import wineTwo from '../assets/Product/WINES/1_r1_c6_processed_by_imagy.png';
import spiritOne from '../assets/Product/SPIRITS/Screenshot 2025-12-08 095002.png';
import spiritTwo from '../assets/Product/SPIRITS/Screenshot 2025-12-08 095014.png';
import beerOne from '../assets/Product/BEERS/Screenshot 2025-12-08 095059.png';
import beerTwo from '../assets/Product/BEERS/Screenshot 2025-12-08 095128.png';

export type Product = {
  id: string;
  name: string;
  category: string;
  origin: string;
  bio: boolean;
  discountEligible: boolean;
  melinisme: number;
  price: number;
  description: string;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'chateau-margaux-2018',
    name: 'Chateau Margaux 2018',
    category: 'wines',
    origin: 'wines',
    bio: true,
    discountEligible: true,
    melinisme: 2018,
    price: 45.5,
    description: 'Chateau Margaux 2018',
    image: wineOne,
  },
  {
    id: 'bordeaux-superieur-2020',
    name: 'Bordeaux Superieur AOC 2020',
    category: 'wines',
    origin: 'wines',
    bio: false,
    discountEligible: true,
    melinisme: 2020,
    price: 28.9,
    description: 'Bordeaux Superieur AOC 2020',
    image: wineTwo,
  },
  {
    id: 'veuve-clicquot-brut',
    name: 'Champagne Veuve Clicquot Brut',
    category: 'spirits',
    origin: 'spirits',
    bio: false,
    discountEligible: true,
    melinisme: 2019,
    price: 58.5,
    description: 'Champagne Veuve Clicquot Brut',
    image: spiritOne,
  },
  {
    id: 'moet-chandon-imperial',
    name: 'Champagne Moet & Chandon Imperial',
    category: 'spirits',
    origin: 'spirits',
    bio: false,
    discountEligible: true,
    melinisme: 2021,
    price: 52.0,
    description: 'Champagne Moet & Chandon Imperial',
    image: spiritTwo,
  },
  {
    id: 'casablanca-premium',
    name: 'Casablanca Premium',
    category: 'beers',
    origin: 'beers',
    bio: true,
    discountEligible: true,
    melinisme: 2022,
    price: 12.5,
    description: 'Casablanca Premium',
    image: beerOne,
  },
  {
    id: 'corona-extra',
    name: 'Corona Extra',
    category: 'beers',
    origin: 'beers',
    bio: false,
    discountEligible: true,
    melinisme: 2020,
    price: 18.9,
    description: 'Corona Extra',
    image: beerTwo,
  },
];
