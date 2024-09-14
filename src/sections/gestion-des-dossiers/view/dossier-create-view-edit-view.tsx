'use client'

/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname } from 'next/navigation';

// MUI
import Card from '@mui/material/Card';
import { Box, Container, Divider, Stack, Tab, Tabs, alpha, useTheme } from '@mui/material';

// UI Local Components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import FicheClient from 'src/components/dossier/fiche-client/fiche-client';
import PiecesJointes from 'src/components/dossier/pieces-jointes/pieces-jointes';
import ModeActuel from 'src/components/dossier/mode-actuel/mode-actuel';
import TableauFinancier from 'src/components/dossier/tableau-financier/tableau-financier';
import { useBoolean } from 'src/hooks/use-boolean';
import { useRouter } from 'src/routes/hooks';
import axios, { endpoints } from 'src/utils/axios';
import { IDossierItem } from 'src/types/dossier';
import DossierTitles from '../dossier-titles';
import Scrollbar from 'src/components/scrollbar';

/* -------------------------------------------------------------------------- */
/*                          CREATE VIEW EDIT DOSSIER                          */
/* -------------------------------------------------------------------------- */
type Props = {
  id?: number;
};

function CreateViewEditDossier({id}: Props) {
/* ---------------------------------- HOOKS --------------------------------- */
  const { enqueueSnackbar } = useSnackbar();
  const pathname = usePathname();
  const router = useRouter();
  const loadingSend = useBoolean();
  const [currentDossier, setCurrentDossier] = useState<IDossierItem>();
  const [tabValue, setTabValue] = useState('fiche-client');
  const settings = useSettingsContext();
  const theme = useTheme();

/* --------------------------- UPDATE ANME SCHEMA --------------------------- */
  const fetchCurrentDossier = async () => {
    const { data: response } = await axios.get(endpoints.dossier.details(id));
    setCurrentDossier(response);
    reset(response);
  };

  useEffect(() => {
    if (!id) {
      return;
    } else {
      fetchCurrentDossier();
    }
  }, [id]);

  const UpdateDossierSchema = Yup.object().shape({
    // fiche client
    POSTALCODE: Yup.number(),
    //@TO DO: add Gouvernement (select)
    DISTRICT: Yup.string(),
    ADRINSTALLATION: Yup.string().required("Address D'Installation est obligé"),
    VILLE: Yup.string(), //@TO DO: switch to a select
    CIN: Yup.number().required('CIN est obligé'),
    NOM: Yup.string().required('Nom est obligé'),
    PRENOM: Yup.string().required('Prénom est obligé'),
    TEL: Yup.string().required('Numéro de télèphone est obligé'),
    DATEEMISSION: Yup.mixed<any>().nullable().required("Date d'Emmission est obligé"),
    DATECONTRAT: Yup.mixed<any>().nullable().required("Date d'Emmission est obligé"),
    ENTRETIENTMANUEL: Yup.boolean(),
    FACTUREDETAILLE: Yup.boolean(),
    CONTRATGARANTIE: Yup.boolean(),

    // mode actuel
    MchGPL: Yup.boolean(),
    MchElectrique: Yup.boolean(),
    MchGazNaturel: Yup.boolean(),
    MchAutre: Yup.boolean(),

    INSTALLATEUR: Yup.string().required('Installateur est obligé'), //@TO DO : switch to a select
    
    MARQUE: Yup.string().required('Marque est obligé'), //@TO DO : switch to a select
    NUMADMISSION: Yup.number().required('Numéro Admission est obligé'),
    CAPACITE: Yup.string().required('Capacité est obligé'),
    SURFACE: Yup.string().required('Surface est obligé'),
    
    NUMSERIECAPTEUR1: Yup.string().required('Capteur 1 est obligé'), // @TO DO : swiwtch it to a select
    NUMSERIECAPTEUR2: Yup.string().required('Capteur 2 est obligé'), // @TO DO : swiwtch it to a select
    BALLON: Yup.string().required('Ballon est obligé'), // @TO DO : swiwtch it to a select

    // tableau financier
    PRIXTTC: Yup.number().required('Prix TTC est obligé'),
    subvention: Yup.number().required('Subvention est obligé'),
    AUTOFINANCE: Yup.number().required('Auto Financement est obligé'),

    // pieces jointes
    fichersJoint: Yup.array().min(1, 'Images sont obligé')
  });

/* ----------------------- DEFAULT VALUES OF ANME TYPE ---------------------- */
  const defaultValues = useMemo(
    () => ({
      // fiche client
      POSTALCODE: currentDossier?.POSTALCODE || 0,
      //@TO DO: add Gouvernement
      DISTRICT: currentDossier?.DISTRICT || '',
      ADRINSTALLATION: currentDossier?.ADRINSTALLATION || '',
      VILLE: currentDossier?.VILLE || '',
      CIN: currentDossier?.CIN || 0,
      NOM: currentDossier?.NOM || '',
      PRENOM: currentDossier?.PRENOM || '',
      TEL: currentDossier?.TEL || '',
      DATEEMISSION: currentDossier?.DATEEMISSION || null,
      DATECONTRAT: currentDossier?.DATECONTRAT || null,
      ENTRETIENTMANUEL: currentDossier?.ENTRETIENTMANUEL || false,
      FACTUREDETAILLE: currentDossier?.FACTUREDETAILLE || false, 
      CONTRATGARANTIE: currentDossier?.CONTRATGARANTIE || false, 

      // mode actuel
      MchGPL: currentDossier?.MchGPL || false, 
      MchElectrique: currentDossier?.MchElectrique || false, 
      MchGazNaturel: currentDossier?.MchGazNaturel || false, 
      MchAutre: currentDossier?.MchAutre || false, 

      INSTALLATEUR: currentDossier?.INSTALLATEUR || '', //@TO DO: []
      
      MARQUE: currentDossier?.MARQUE || '', //@TO DO: []
      NUMADMISSION: currentDossier?.NUMADMISSION || 0,
      CAPACITE: currentDossier?.CAPACITE || '',
      SURFACE: currentDossier?.SURFACE || '',
      
      NUMSERIECAPTEUR1: currentDossier?.NUMSERIECAPTEUR1 || '', //@TO DO: []
      NUMSERIECAPTEUR2: currentDossier?.NUMSERIECAPTEUR2 || '', //@TO DO: []
      BALLON: currentDossier?.BALLON || '', //@TO DO: []

      // tableau financier
      PRIXTTC: currentDossier?.PRIXTTC || 0.0,
      subvention: currentDossier?.subvention || 0,
      AUTOFINANCE: currentDossier?.AUTOFINANCE || 0.0,

      // pieces jointes
      fichersJoint: currentDossier?.fichersJoint || []
    }),
    [currentDossier]
  );

  const methods = useForm({
    resolver: yupResolver(UpdateDossierSchema),
    defaultValues,
  });

/* -------------------------------- CONSTANTS ------------------------------- */
  // TABS
  const DOSSIER_OPTIONS = [
    { $id: '01', value:'fiche-client', label: 'Fiche Client' },
    { $id: '02', value: 'mode-actuel', label: 'Mode Actuel', width: 180 },
    { $id: '03', value: 'tableau-financier', label: 'Tableau Financier', width: 220 },
    { $id: '04', value: 'pieces-jointes', label: 'Pièces Jointes', width: 180 }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

/* ------------------------------- HANDLE DROP ------------------------------ */
  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = methods;

  const values = watch();

/* ------------------------------- HANDLE DROP ------------------------------ */
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.fichersJoint || [];
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setValue('fichersJoint', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.fichersJoint]
  );

/* --------------------------- HANDLE REMOVE FILE --------------------------- */
  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.fichersJoint && values.fichersJoint?.filter((file: string | File) => file !== inputFile);
      setValue('fichersJoint', filtered);
    },
    [setValue, values.fichersJoint]
  );

/* ------------------------- HANDLE REMOVE ALL FILES ------------------------ */
  const handleRemoveAllFiles = useCallback(() => {
    setValue('fichersJoint', []);
  }, [setValue]);
  
/* ---------------------- HANDLE ADD OR UPDATE AND SEND --------------------- */
  const handleAddUpdateAndSend = handleSubmit(async (data) => {
    loadingSend.onTrue();
    try {
      const formData = new FormData();

      // Append files to FormData
      data?.fichersJoint?.forEach((file: File) => {
        formData.append('fichersJoint', file);
      });
      
      if (!id) {
        await axios.post(endpoints.dossier.list, data);
      } 
      
      if (id && !ISVIEWPAGE) {
        await axios.patch(`${endpoints.dossier.edit}/${id}`, data);
        await axios.post(`${endpoints.dossier.list}/${id}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      router.push(paths.dashboard.gestionsDesDossiers);
      loadingSend.onFalse();
    } catch (error) {
      console.error(error);
    }
    
  }); 

  const ISVIEWPAGE = pathname.includes('view');

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={!id? 'Ajouter Dossier' : ISVIEWPAGE ? 'View Dossier' : 'Modifier Dossier'}
        links={[
          { name: 'Acceuil', href: paths.dashboard.root },
          { name: 'Gestion Des Lots', href: paths.dashboard.gestionsDesLots },
          { 
            name: !id ? 'Ajouter Dossier' : ISVIEWPAGE ? 'View Dossier' : 'Modifier Dossier'
          } 
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* -------------------------------- OVERVIEW -------------------------------- */}
      {ISVIEWPAGE && <Card sx={{  mb: { xs: 3, md: 5 } }}>
        <Scrollbar>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
            sx={{ py: 2 }}
          >
            <DossierTitles
              icon="solar:bill-list-bold-duotone"
              color={theme.palette.info.main}
              title="Bon de Livraison"
              subtitle='Client'
            />
              
            <DossierTitles
              icon="icomoon-free:profile"
              color={theme.palette.success.main}
              title="Generations des"
              subtitle='réglement'
            />

            <DossierTitles
              icon="mdi:payment-settings"
              color={theme.palette.warning.main}
              title="Bon de Livraison"
              subtitle='Installateur'
            />

            <DossierTitles
              icon="solar:delivery-line-duotone"
              color={theme.palette.text.secondary}
              title="Bon de Livraison"
              subtitle='ANME'
            />
          </Stack>
        </Scrollbar>
      </Card>}
      {/* ------------------------------ END OVERVIEW ------------------------------ */}
      
      <Card>
        <Tabs
          value={tabValue}
          onChange={handleTabChange} 
          aria-label="generation ANME tab"
          sx={{
            px: 2.5,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {DOSSIER_OPTIONS?.map((tab) => <Tab key={tab.value} value={tab.value} label={tab.label} /> )}
        </Tabs>

        <FormProvider methods={methods}>
          <Box sx={{p: 2.5}}> 
            {tabValue === 'fiche-client' ? <FicheClient control={control} /> : ''}
            {tabValue === 'mode-actuel' && <ModeActuel />}
            {tabValue === 'tableau-financier' && <TableauFinancier /> }
            {tabValue === 'pieces-jointes' && <PiecesJointes
                id={id}
                ISVIEW={ISVIEWPAGE}
                onSubmit={handleAddUpdateAndSend}
                isSubmitting={isSubmitting}
                loadingSend={loadingSend}
                handleDrop={handleDrop}
                handleRemoveFile={handleRemoveFile}
                handleRemoveAllFiles={handleRemoveAllFiles}
              />
            }     
          </Box>
        </FormProvider>
      </Card>
    </Container>
  );
};

export default CreateViewEditDossier;