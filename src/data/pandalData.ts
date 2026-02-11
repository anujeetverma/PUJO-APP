// src/data/pandalData.ts (or wherever you define your pandals)
import { Pandal } from '../types';

export const PANDALS: Pandal[] = [
  {
    id: '1',
    name: 'College Square',
    description: 'Famous for lighting on the lake.',
    location: { latitude: 22.5726, longitude: 88.3639 }, // College St
    image: 'https://example.com/college.jpg',
  },
  {
    id: '2',
    name: 'Md Ali Park',
    description: 'Traditional idol with huge pandal.',
    location: { latitude: 22.5756, longitude: 88.3598 }, // Near College Sq
    image: 'https://example.com/ali.jpg',
  },
  {
    id: '3',
    name: 'Santosh Mitra Square',
    description: 'Known for gold and silver chariots.',
    location: { latitude: 22.5646, longitude: 88.3712 }, // Sealdah area
    image: 'https://example.com/santosh.jpg',
  },
  {
    id: '4',
    name: 'Bagbazar Sarbojanin',
    description: 'One of the oldest pujas.',
    location: { latitude: 22.6022, longitude: 88.3661 }, // North Kolkata
    image: 'https://example.com/bagbazar.jpg',
  },
  {
    id: '5',
    name: 'Kalyani ITI Puja',
    description: 'Popular community puja in Kalyani ITI area.',
    location: { latitude: 22.9750, longitude: 88.4345 }, // Kalyani ITI
    image: 'https://example.com/kalyani-iti.jpg',
  },
  {
    id: '6',
    name: 'Kalyani Central Park Puja',
    description: 'Known for creative themes and large crowds.',
    location: { latitude: 22.9775, longitude: 88.4332 }, // Central Park Kalyani
    image: 'https://example.com/central-park.jpg',
  },
  {
    id: '7',
    name: 'Salt Lake FD Block Puja',
    description: 'One of the most visited pujas in Salt Lake.',
    location: { latitude: 22.5880, longitude: 88.4105 }, // Salt Lake
    image: 'https://example.com/fd-block.jpg',
  },
  {
    id: '8',
    name: 'Dumdum Park Bharat Chakra',
    description: 'Famous for innovative theme pandals.',
    location: { latitude: 22.6190, longitude: 88.4080 }, // Dumdum Park
    image: 'https://example.com/dumdum.jpg',
  },
  {
    id: '9',
    name: 'Sreebhumi Sporting Club',
    description: 'Grand scale themed puja attracting huge visitors.',
    location: { latitude: 22.6035, longitude: 88.4063 }, // Sreebhumi
    image: 'https://example.com/sreebhumi.jpg',
  },
];