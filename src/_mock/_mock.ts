/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Helpers
import { ASSETS_API } from 'src/config-global';
import {
  _id,

  // DOSSIER
  // fiche client
  _CIN,
  _tel,
  _dateEmission,

  _addressInstallation,
  _gouvernement,
  _codePostal,

  _clientTypes,

  _district,
  _ville,
  _dateContrat,

  // mode actuel
  _modeActuel,

  _installateur,

  _marque,
  _numeroAdmission,
  _capacite,
  _surface,

  _capteur_1,
  _capteur_2,
  _ballon,

  // tableau financiere
  _PrixTTC,
  _subvention,
  _autoFinancement,

  _images,

  // others
  _numeroDesLots,
  _numeroDossier,
  _refSTEG,

  // LOT
  _numéroLotSINES,
  _numéroLotANME,
  _lotAvecSTEG,
  _dateCréation,
  _créateur,
  _dateDéposition,
  _rejet,

  // USER
  _firstName,
  _lastName,
  _fullName, // this is for overview page 
  _codeUser,
  _role,
  _password,
  _comfirmPassword,
  _status,
} from './assets';

/* -------------------------------------------------------------------------- */
/*                               FILE MOCK                                    */
/* -------------------------------------------------------------------------- */
export const _mock = {
  id: (index: number) => _id[index],

  // DOSSIER
  // fiche client
  CIN: (index: number) => _CIN[index],
  tel: (index: number) => _tel[index],
  dateEmission: (index: number) => _dateEmission[index],

  addressInstallation: (index: number) => _addressInstallation[index],
  gouvernement: (index: number) => _gouvernement[index],
  codePostal: (index: number) => _codePostal[index],

  clientTypes: (index: number) => _clientTypes[index],

  district: (index: number) => _district[index],
  ville: (index: number) => _ville[index],
  dateContrat: (index: number) => _dateContrat[index],

  // mode actuel
  modeActuel: (index:number) => _modeActuel[index],

  installateur: (index:number) => _installateur[index],

  marque: (index:number) => _marque[index],
  numeroAdmission: (index:number) => _numeroAdmission[index],
  capacite: (index:number) => _capacite[index],
  surface: (index:number) => _surface[index],

  capteur_1: (index: number) => _capteur_1[index],
  capteur_2: (index: number) => _capteur_2[index],
  ballon: (index: number) => _ballon[index],

  // tableau financiere
  PrixTTC: (index: number) => _PrixTTC[index],
  subvention: (index: number) => _subvention[index],
  autoFinancement: (index: number) => _autoFinancement[index],

  images: (index: number) => _images[index],

  // others
  numeroDesLots: (index: number) => _numeroDesLots[index],
  numeroDossier: (index: number) => _numeroDossier[index],
  refSTEG: (index: number) => _refSTEG[index],

  // LOT
  numéroLotSINES: (index: number) => _numéroLotSINES[index],
  numéroLotANME: (index: number) => _numéroLotANME[index],
  lotAvecSTEG: (index: number) => _lotAvecSTEG[index],
  dateCréation: (index: number) => _dateCréation[index],
  créateur: (index: number) => _créateur[index],
  dateDéposition: (index: number) => _dateDéposition[index],
  rejet: (index: number) => _rejet[index],
  
  // USER
  firstName: (index: number) => _firstName[index],
  lastName: (index: number) => _lastName[index],
  fullName: (index: number) => _fullName[index],
  codeUser: (index: number) => _codeUser[index],
  role: (index: number) => _role[index],
  password: (index: number) => _password[index],
  comfirmPassword: (index: number) => _comfirmPassword[index],
  status: (index: number) => _status[index],
  // Image
  image: {
    avatar: (index: number) => `${ASSETS_API}/assets/images/avatar/avatar_${index + 1}.jpg`,
  },
};
