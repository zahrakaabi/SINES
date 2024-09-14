/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Local Components
import { _mock } from 'src/_mock';

/* -------------------------------------------------------------------------- */
/*                             useMockedANME HOOK                             */
/* -------------------------------------------------------------------------- */
export function useMockedANME() {
/* -------------------------------- CONSTANTS ------------------------------- */
  const ANME = {
    // fiche client
    CIN: '03280675',
    firstName: 'Naceur',
    lastName: 'Khaldi',
    fullName: 'Naceur Khaldi',
    tel: 23505166,
    dateEmission: new Date(2014, 3, 28),

    addressInstallation: 'Cité El Izdihar',
    gouvernement: 'Kebili',
    codePostal: 4260,

    clientTypes: ["Manuel d'Entretien", 'Facture Détaillé', 'Contrat Garantie'],

    district: 'Kabeli', // @TO DO : switch it to a select
    ville: 'Kebili',
    dateContrat: new Date(2021, 1, 21),

    // mode actuel
    modeActuel: ["Electrique"],

    installateur: 'NOOMEN BEN YAHYA | 537', // @TO DO : switch to a select

    marque: 'CHAUFFF-EAU SOLAIRE DUROSOL', // @TO DO : switch to a select
    numeroAdmission: 5506,
    capcite: 200,
    surface: 2,

    capteur_1: 'EV20201228', // @TO DO : swiwtch it to a select
    capteur_2: '', // @TO DO : swiwtch it to a select
    ballon: 'BJ20201282', // @TO DO : swiwtch it to a select

    // tableau financier
    PrixTTC: 1750.0000,
    subvention: 200.000,
    autoFinancement: 1550.000,

    // pieces jointes
    images: []
  };

/* -------------------------------- RENDERING ------------------------------- */
  return { ANME };
};