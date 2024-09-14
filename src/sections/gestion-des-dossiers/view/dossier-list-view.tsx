'use client';

/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useEffect, useState } from 'react';

// MUI
import { Card, Container, Divider, Stack, useTheme } from '@mui/material';

// UI Local Components
import { useSettingsContext } from 'src/components/settings';
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import DossiersTable from 'src/components/dossiers-table/view/dossier-list-view';
import Scrollbar from 'src/components/scrollbar';
import { IDossierItem } from 'src/types/dossier';
import axios, { endpoints } from 'src/utils/axios';
import DossierTitles from '../dossier-titles';

/* -------------------------------------------------------------------------- */
/*                       GESTION DES DOSSIERS COMPONENT                       */
/* -------------------------------------------------------------------------- */
function GestionDesDossiers() {
/* -------------------------- HOOKS & CUSTOM HOOKS -------------------------- */
  const settings = useSettingsContext();
  const theme = useTheme();
  const [tableData, setTableData] = useState<IDossierItem[]>([]);

/* ------------------------------ GET DOSSIERS ------------------------------ */
  const fetchDossiers = async () => {
    try {
      await axios.get(endpoints.dossier.list)
        .then(({data: response}) => setTableData(response))
    } catch(error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchDossiers();
  }, []);

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading='Gestion Des Dossiers'
          links={[
            { name: 'Acceuil', href: paths.dashboard.root },
            { name: 'Gestion Des Dossiers', href: paths.dashboard.gestionsDesDossiers }
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {/* -------------------------------- OVERVIEW -------------------------------- */}
        <Card sx={{  mb: { xs: 3, md: 5 } }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <DossierTitles
                icon="solar:bill-list-bold-duotone"
                percent={100}
                color={theme.palette.info.main}
                title="Tout"
                total={tableData.length}
              />
              
              <DossierTitles
                icon="icomoon-free:profile"
                percent={0} //{getPercentByStatus('ANME')}
                color={theme.palette.success.main}
                title="ANME"
                total={0} //{getLotLength('ANME')}
              />

              <DossierTitles
                icon="mdi:payment-settings"
                percent={0} //{getPercentByStatus('REJ ANME')}
                color={theme.palette.warning.main}
                title="REJ ANME"
                total={0} //{getLotLength('REJ ANME')}
              />

              <DossierTitles
                icon="solar:delivery-line-duotone"
                percent={0} //{getPercentByStatus('STEG')}
                color={theme.palette.text.secondary}
                title="STEG"
                total={0} //{getLotLength('STEG')}
              />

              <DossierTitles
                icon="mdi:payment-settings"
                percent={0} //{getPercentByStatus('REJ STEG')}
                color={theme.palette.warning.main}
                title="REJ STEG"
                total={0} //{getLotLength('REJ STEG')}
              />

              <DossierTitles
                icon="mdi:file-document-plus-outline"
                percent={0} //{getPercentByStatus('DRAFT ANME')}
                color={theme.palette.error.main}
                title="DRAFT ANME"
                total={0} //{getLotLength('DRAFT ANME')}
              />

              <DossierTitles
                icon="mdi:file-document-plus-outline"
                percent={0} //{getPercentByStatus('DRAFT STEG')}
                color={theme.palette.error.main}
                title="DRAFT STEG"
                total={0} //{getLotLength('DRAFT STEG')}
              />
            </Stack>
          </Scrollbar>
        </Card>
        {/* ------------------------------ END OVERVIEW ------------------------------ */}
      
        <DossiersTable tableData={tableData} setTableData={setTableData} />
    </Container>
  );
};

export default GestionDesDossiers;