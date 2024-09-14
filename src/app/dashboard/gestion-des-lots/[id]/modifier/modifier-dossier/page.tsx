/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import CreateViewEditDossier from "src/sections/gestion-des-dossiers/view/dossier-create-view-edit-view";

/* -------------------------------------------------------------------------- */
/*                                  META DATA                                 */
/* -------------------------------------------------------------------------- */
export const metadata = {
    title: 'SINES | Gestion des lots | Modifier dossier',
};

type Props = {
  params: {
    id: number;
  };
};

/* -------------------------------------------------------------------------- */
/*                             MODIFIER UN DOSSIER                            */
/* -------------------------------------------------------------------------- */
function EditDossierPage({ params }: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { id } = params;
    
/* -------------------------------- RENDERING ------------------------------- */
  return <CreateViewEditDossier id={id} />
}

export default EditDossierPage;