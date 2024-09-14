/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// MUI
import { Box, Grid, Stack, Typography } from "@mui/material";

// Local Components
import { RHFTextField } from "../../hook-form";
import { ANME_MODE_ACTUEL_OPTIONS } from "src/_mock/_ANME";
import { RHFCheckbox, RHFMultiCheckbox } from "../../hook-form/rhf-checkbox";

/* -------------------------------------------------------------------------- */
/*                            MODE ACTUEL COMPONENT                           */
/* -------------------------------------------------------------------------- */
function ModeActuel() {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
      <Grid item xs={12}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2"> Mode actuel de chauffage de l'eau </Typography>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <RHFCheckbox name="MchGPL" label="GPL" />
            <RHFCheckbox name="MchElectrique" label="Electrique" />
            <RHFCheckbox name="MchGazNaturel" label="Gaz Naturel" />
            <RHFCheckbox name="MchAutre" label="Autre" />
          </Grid>
        </Stack>
      </Grid>
        
      <Grid item xs={12}>
        <RHFTextField name="INSTALLATEUR" label="Choisir un installateur" />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle2"> Equipement Installé </Typography>
        <Box
          sx={{ pt: 2}}
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(4, 1fr)',
          }}
        >
        <RHFTextField name="MARQUE" label="Marque" />
        <RHFTextField name="NUMADMISSION" label="Numéro admission" />
        <RHFTextField name="CAPACITE" label="Capacité" />
        <RHFTextField name="SURFACE" label="Surface" />
      </Box>
    </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle2"> Num Série </Typography>
        <Box
          sx={{ pt: 2}}
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(3, 1fr)',
          }}
        >
          <RHFTextField name="NUMSERIECAPTEUR1" label="Capteur 1" />
          <RHFTextField name="NUMSERIECAPTEUR2" label="Capteur 2" />
          <RHFTextField name="BALLON" label="Ballon" />
        </Box>
      </Grid>
    </Grid>
  )
};

export default ModeActuel;