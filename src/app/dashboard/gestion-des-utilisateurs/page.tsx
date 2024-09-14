/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Local Components
import GestionDesUtilisateurs from 'src/sections/gestion-des-utilisateurs/view/utilisateur-list-view';

/* -------------------------------------------------------------------------- */
/*                                  META DATA                                 */
/* -------------------------------------------------------------------------- */
export const metadata = {
  title: 'SINES | Gestion des utilisateurs',
};

/* -------------------------------------------------------------------------- */
/*                              GESTION DES LOTS                              */
/* -------------------------------------------------------------------------- */
function GestionDesUtilisateursPage() {
/* -------------------------------- RENDERING ------------------------------- */
  return <GestionDesUtilisateurs />;
};

export default GestionDesUtilisateursPage;