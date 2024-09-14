/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import CreateViewEditDossier from "src/sections/gestion-des-dossiers/view/dossier-create-view-edit-view";

/* -------------------------------------------------------------------------- */
/*                                  META DATA                                 */
/* -------------------------------------------------------------------------- */
export const metadata = {
    title: 'SINES | Gestion des lots | Ajouter dossier',
};

/* -------------------------------------------------------------------------- */
/*                             AJOUTER UN DOSSIER                             */
/* -------------------------------------------------------------------------- */
function CreateDossierPage() {
/* -------------------------------- RENDERING ------------------------------- */
  return <CreateViewEditDossier />
}

export default CreateDossierPage;