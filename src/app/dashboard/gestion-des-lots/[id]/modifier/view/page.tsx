/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Local Components
import CreateViewEditDossier from "src/sections/gestion-des-dossiers/view/dossier-create-view-edit-view";

/* -------------------------------------------------------------------------- */
/*                                  META DATA                                 */
/* -------------------------------------------------------------------------- */
export const metadata = {
    title: 'SINES | Gestion des lots | Dossier',
};

type Props = {
  params: {
    id: number;
  };
};

/* -------------------------------------------------------------------------- */
/*                              VIEW UN DOSSIER                               */
/* -------------------------------------------------------------------------- */
function ViewDossierPage({ params }: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { id } = params;
    
/* -------------------------------- RENDERING ------------------------------- */
  return <CreateViewEditDossier id={id} />
}

export default ViewDossierPage;