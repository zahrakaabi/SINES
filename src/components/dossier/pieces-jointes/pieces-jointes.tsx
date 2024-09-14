/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// MUI
import { LoadingButton } from "@mui/lab";

// Local Components
import { Stack } from "@mui/material";
import { RHFUpload } from "../../hook-form";

/* -------------------------------------------------------------------------- */
/*                          PIECES JOINTES COMPONENT                          */
/* -------------------------------------------------------------------------- */
function PiecesJointes({id, ISVIEW, loadingSend, isSubmitting, onSubmit, handleDrop, handleRemoveFile, handleRemoveAllFiles}: any) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <>
      <RHFUpload
        multiple
        thumbnail
        name="fichersJoint"
        maxSize={3145728}
        onDrop={handleDrop}
        onRemove={handleRemoveFile}
        onRemoveAll={handleRemoveAllFiles}
        onUpload={() => console.info('ON UPLOAD')}
      />
      {!ISVIEW ? <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          variant="contained"
          loading={loadingSend.value && isSubmitting}
          onClick={onSubmit}
        >
          {!id ? 'Ajouter' : 'Modifier'}
        </LoadingButton>
      </Stack> : ''}
    </>
  )
};

export default PiecesJointes;