'use client';

/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useCallback, useState } from 'react';

// MUI 
import { Container, Tab, Tabs } from '@mui/material';

// Local Components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import Iconify from 'src/components/iconify';
import ProfileParametres from '../profile-parametres';

/* -------------------------------------------------------------------------- */
/*                                PROFILE PAGE                                */
/* -------------------------------------------------------------------------- */
function Profile() {
/* ---------------------------------- HOOKS --------------------------------- */
  const settings = useSettingsContext();
  const [currentTab, setCurrentTab] = useState('parametres');

/* -------------------------------- CONSTANTS ------------------------------- */
  const TABS = [
    {
      value: 'parametres',
      label: 'Paramètres',
      icon: <Iconify icon="solar:user-id-bold" width={24} />,
    },
    {
      value: 'grille-tarifaire',
      label: 'Grille Tarifaire',
      icon: <Iconify icon="solar:bill-list-bold" width={24} />,
    },
    {
      value: 'historqiue',
      label: 'Historique',
      icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
    }
  ];

/* ---------------------------- HANDLE CHANGE TAB --------------------------- */
  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {/* ------------------------ START CUSTOM BREADCRUMBS ------------------------ */}
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Acceuil', href: paths.dashboard.root },
          { name: 'Profile', href: '/dashboard/profile' }
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {/* -------------------------- END CUSTOM BREADRUMBS ------------------------- */}

      {/* ------------------------------- START TABS ------------------------------- */}
      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>


      {currentTab === 'parametres' && <ProfileParametres />}

      {currentTab === 'grille-tarifaire' && <h1> Grille Tarifaire </h1>}

      {currentTab === 'historqiue' && <h1> Historique </h1>}
      
      {/* -------------------------------- END TABS -------------------------------- */}
    </Container>
  );
};

export default Profile;