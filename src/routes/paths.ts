/* -------------------------------------------------------------------------- */
/*                                    PATHS                                   */
/* -------------------------------------------------------------------------- */
const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`
    },
  },
  // DASHBOARD
  dashboard: {
    root: `${ROOTS.DASHBOARD}/table-de-bord`,
    tableDeBord: `${ROOTS.DASHBOARD}/table-de-bord`,
    gestionsDesLots: `${ROOTS.DASHBOARD}/gestion-des-lots`,
    gestionsDesDossiers: `${ROOTS.DASHBOARD}/gestion-des-dossiers`,
    gestionsDesUtlisateurs: `${ROOTS.DASHBOARD}/gestion-des-utilisateurs`,
    profile: `${ROOTS.DASHBOARD}/profile`,
    details: (id: number) => `${ROOTS.DASHBOARD}/gestion-des-lots/${id}/modifier/view`,
    lot: {
      list: `${ROOTS.DASHBOARD}/gestion-des-lots`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/gestion-des-lots/${id}/modifier`,
      editFile: (id: number) => `${ROOTS.DASHBOARD}/gestion-des-lots/${id}/modifier/modifier-dossier`,
      create: (id: number) => `${ROOTS.DASHBOARD}/gestion-des-lots/${id}/modifier/ajouter-dossier` 
    },
  }
};