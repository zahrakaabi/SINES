/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Local Components
import GestionDesDossiers from "src/sections/gestion-des-dossiers/view/dossier-list-view";

/* -------------------------------------------------------------------------- */
/*                                  META DATA                                 */
/* -------------------------------------------------------------------------- */
export const metadata = {
  title: 'SINES | Gestion des dossiers',
};

/* -------------------------------------------------------------------------- */
/*                              GESTION DES LOTS                              */
/* -------------------------------------------------------------------------- */
function GestionDesDossiersPage() {
/* -------------------------------- RENDERING ------------------------------- */
  return <GestionDesDossiers />;
};

export default GestionDesDossiersPage;