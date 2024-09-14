/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Controller } from "react-hook-form";
import { parseISO } from "date-fns";

// MUI
import { Grid } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Local Components
import { RHFAutocomplete, RHFTextField } from "../../hook-form";
import { RHFCheckbox } from "../../hook-form/rhf-checkbox";
import { gouvernements } from "src/assets/data";

/* -------------------------------------------------------------------------- */
/*                          PIECES JOINTES COMPONENT                          */
/* -------------------------------------------------------------------------- */
function FicheClient({control}: any) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
      <Grid item xs={3}>
        <RHFTextField name="POSTALCODE" label="Code Postal" />
      </Grid>

      <Grid item xs={3}>
        <RHFAutocomplete
          name="VILLE"
          label="Gouvernement"
          placeholder="Choisir un gouvernement"
          fullWidth
          options={gouvernements.map((option) => option.label)}
          getOptionLabel={(option) => option}
        />
      </Grid>

      <Grid item xs={3}>
        <RHFAutocomplete
          name="DISTRICT"
          label="District"
          placeholder="Choisir une ville"
          fullWidth
          options={gouvernements.map((option) => option.label)}
          getOptionLabel={(option) => option}
        />
      </Grid>

      <Grid item xs={3}>
        <RHFTextField name="ADRINSTALLATION" label="Adresse d'Installation" />
      </Grid>

      <Grid item xs={3}>
        <RHFAutocomplete
          name="VILLE"
          placeholder="Choisir une ville"
          fullWidth
          options={gouvernements.map((option) => option.label)}
          getOptionLabel={(option) => option}
        />
      </Grid>

      <Grid item xs={3}>
        <RHFTextField name="CIN" label="CIN" />
      </Grid>

      <Grid item xs={3}>
        <RHFTextField name="NOM" label="Nom" />
      </Grid>

      <Grid item xs={3}>
        <RHFTextField name="PRENOM" label="Prénom" />
      </Grid>

      <Grid item xs={3}>
        <RHFTextField name="TEL" label="Numéro de Télèphone" />
      </Grid>


      <Grid item xs={3}>
        <Controller
          name="DATEEMISSION"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="Date d&apos;Emission"
              value={typeof field.value === 'string' ? parseISO(field.value) : field.value}
              onChange={(newValue) => {
                  field.onChange(new Date(newValue));
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!error,
                  helperText: error?.message,
                },
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={3}>
        <Controller
          name="DATECONTRAT"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="Date Contrat"
              value={typeof field.value === 'string' ? parseISO(field.value) : field.value}
              onChange={(newValue) => {
                  field.onChange(new Date(newValue));
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!error,
                  helperText: error?.message,
                },
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex' }}>
        <RHFCheckbox name="ENTRETIENTMANUEL" label="Manuel d'Entretien" />
        <RHFCheckbox name="FACTUREDETAILLE" label='Facture Détaillé' />
        <RHFCheckbox name="CONTRATGARANTIE" label='Contrat Garantie' />
      </Grid>
    </Grid>
  )
};

export default FicheClient;