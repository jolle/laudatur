export const API_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api'
    : 'https://api.laudatur.io/api';

export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const SUBJECT_ABBREVIATIONS = {
  A: 'Äidinkieli, suomi',
  A5: 'Suomi toisena kielenä',
  BA: 'Ruotsi, pitkä (toinen kotimainen kieli)',
  BB: 'Ruotsi, keskipitkä (toinen kotimainen kieli)',
  BI: 'Biologia',
  EA: 'Englanti, pitkä',
  EC: 'Englanti, lyhyt',
  ET: 'Elämänkatsomustieto',
  FA: 'Ranska, pitkä',
  FC: 'Ranska, lyhyt',
  FF: 'Filosofia',
  FY: 'Fysiikka',
  GE: 'Maantiede',
  HI: 'Historia',
  KE: 'Kemia',
  M: 'Matematiikka, pitkä',
  N: 'Matematiikka, lyhyt',
  PA: 'Espanja, pitkä',
  PC: 'Espanja, lyhyt',
  PS: 'Psykologia',
  SA: 'Saksa, pitkä',
  SC: 'Saksa, lyhyt',
  TC: 'Italia, lyhyt',
  TE: 'Terveystieto',
  UE: 'Uskonto, ev.lut.',
  UO: 'Ortodoksiuskonto',
  VA: 'Venäjä, pitkä',
  VC: 'Venäjä, lyhyt',
  YH: 'Yhteiskuntaoppi'
} as { [key: string]: string };
