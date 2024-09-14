/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// MUI
import { Grid } from "@mui/material";

// Local Components
import { RHFTextField } from "../../hook-form";

/* -------------------------------------------------------------------------- */
/*                         TABLEAU FONANCIER COMPONENT                        */
/* -------------------------------------------------------------------------- */
function TableauFinancier() {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={3}>
          <RHFTextField name="PRIXTTC" label="Prix TTC" />
        </Grid>
        <Grid item xs={3}>
          <RHFTextField name="subvention" label="Subvention" />
        </Grid>
        <Grid item xs={3}>
          <RHFTextField name="AUTOFINANCE" label="Auto Financement" />
        </Grid>
    </Grid>
  )
};

export default TableauFinancier;