'use client';

/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

// MUI
import Container from '@mui/material/Container';
import { Box, Button, Card, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';

// Local Components
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { ILotItem } from 'src/types/lot';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useBoolean } from 'src/hooks/use-boolean';
import { useRouter } from 'src/routes/hooks';
import DossiersTable from 'src/components/dossiers-table/view/dossier-list-view';
import { IDossierItem } from 'src/types/dossier';
import axios, { endpoints } from 'src/utils/axios';
import { parseISO } from 'date-fns';

/* -------------------------------------------------------------------------- */
/*                                LOT EDIT VIEW                               */
/* -------------------------------------------------------------------------- */
type Props = {
  id: number
};

function LotEditView({ id }: Props) {
/* ---------------------------------- HOOKS --------------------------------- */
  const router = useRouter();
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const loadingSend = useBoolean();
  const [currentLot, setCurrentLot] = useState<ILotItem>();
  const [tableData, setTableData] = useState<IDossierItem[]>([]);

/* -------------------------------- CONSTANTS ------------------------------- */
 // GET CURRENT LOT BY ID
  const _getCurrentLot = async () => {
    try {
      const { data: response } = await axios.get(`${endpoints.lot.list}/${id}`);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCurrentLot(response);
      reset(response);
    } catch (error) {
      console.log('error', error)
    }
  }; 

 // GET ALL DOSSIERS
 const _getDossiers = async () => {
  await axios.get(endpoints.dossier.list)
    .then(({data: response}) => setTableData(response))
  };

  useEffect(() => {
    _getCurrentLot();
    _getDossiers();
  }, []);

  const NewCurrentLotSchema = Yup.object().shape({
    NUMLOT: Yup.number().required('Numéro de lot SINES est obligé'),
    NUMANME: Yup.number().required('Numéro de lot ANME est obligé'),
    DATECREATION: Yup.mixed<any>().nullable(),
    DATEDEPOSITION: Yup.mixed<any>(),
  });

  const defaultValues = useMemo(
    () => ({ 
      NUMLOT: currentLot?.NUMLOT || 0,
      NUMANME: currentLot?.NUMANME || 0,
      DATECREATION: currentLot?.DATECREATION || null,
      DATEDEPOSITION: currentLot?.DATEDEPOSITION || null
    }),
    [currentLot]
  );

  const methods = useForm({
    resolver: yupResolver(NewCurrentLotSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

/* -------------------------- HANDLE EDIT AND SEND -------------------------- */
  const handleEditAndSend = handleSubmit(async (data) => {
    loadingSend.onTrue();
    await axios.patch(`${endpoints.lot.edit}/${currentLot?.id}`, data);
    await new Promise((resolve) => setTimeout(resolve, 500));
    enqueueSnackbar('Modification avec succé!');
    reset();
    loadingSend.onFalse();
    router.push(paths.dashboard.gestionsDesLots);
    /*try {
      await axios.patch(`${endpoints.lot.edit}/${currentLot?.id}`, data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Modification avec succé!');
      loadingSend.onFalse();
      router.push(paths.dashboard.gestionsDesLots);
    } catch (error) {
      console.error(error);
      loadingSend.onFalse();
    }*/
  });

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {/* ---------------------------- START BREADCRUMBS --------------------------- */}
      <CustomBreadcrumbs
        heading="Modifier Lot"
        links={[
          { name: 'Acceuil', href: paths.dashboard.root },
          { name: 'Gestion Des Lots', href: paths.dashboard.gestionsDesLots },
          { name: `Num ANME : ${currentLot?.NUMANME ? currentLot?.NUMANME : ''}` }
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {/* ----------------------------- END BREADCRUMBS ---------------------------- */}

      {/* ------------------------- START LOT FORM SECTION ------------------------- */}
      <Card sx={{ px: 3, py: { xs: 3, md: 5 }, mt: { xs: 3, md: 5 } }}>
        <FormProvider methods={methods} onSubmit={handleEditAndSend}>
          <Box
            rowGap={3}
            columnGap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField name="NUMLOT" label="Numéro De Lot SINES" />
            <RHFTextField name="NUMANME" label="Numéro De Lot ANME" />
            <Controller
              name="DATECREATION"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="Date De Création"
                  {...field}
                  format="dd/MM/yyyy"
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
            <Controller
              name="DATEDEPOSITION"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="Date De Déposition"
                  {...field}
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
          </Box>

          <Stack justifyContent="flex-end" direction="row" sx={{ mt: 3 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loadingSend.value && isSubmitting}
            >
              Modifier & Envoyer
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Card>
      {/* -------------------------- END LOT FORM SECTION -------------------------- */}
      
      {/* ------------------------ START FILES LIST SECTION ------------------------ */}
      <Card sx={{ px: 3, pt: { xs: 3, md: 5 }, mt: { xs: 3, md: 5 } }}>
        <CustomBreadcrumbs
          heading='Liste Des Dossiers'
          action={
            <Button 
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() => router.push(paths.dashboard.lot.create(id))}
            >
              Ajouter dossier
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 }}}
        />

        <DossiersTable tableData={tableData} setTableData={setTableData} />
      </Card>
      {/* ------------------------- END FILES LIST SECTION ------------------------- */}
    </Container>
  );
};

export default LotEditView;