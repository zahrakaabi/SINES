/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Local Components
import LotEditView from 'src/sections/gestion-des-lots/view/lot-edit-view';

/* -------------------------------------------------------------------------- */
/*                                  META DATA                                 */
/* -------------------------------------------------------------------------- */
export const metadata = {
  title: 'SINES | Gestion des lots | Modifier Lot',
};

type Props = {
  params: {
    id: number;
  };
};

/* -------------------------------------------------------------------------- */
/*                                LOT EDIT PAGE                               */
/* -------------------------------------------------------------------------- */
async function LotEditPage({ params }: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { id } = params;

/* -------------------------------- RENDERING ------------------------------- */
  return <LotEditView id={id} />;
};

export default LotEditPage;