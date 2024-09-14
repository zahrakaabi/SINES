/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useMemo } from 'react';

// UI Local Components
import { paths } from 'src/routes/paths';
import SvgColor from 'src/components/svg-color';

/* -------------------------------------------------------------------------- */
/*                              CONFIG NAVIGATION                             */
/* -------------------------------------------------------------------------- */
const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

/* ---------------------------------- ICONS --------------------------------- */
const ICONS = {
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  folder: icon('ic_folder'),
  user: icon('ic_user'),
  file: icon('ic_file'),
};

/* -------------------------------------------------------------------------- */
/*                                USE NAV DATA                                */
/* -------------------------------------------------------------------------- */
export function useNavData() {
  const data = useMemo(
    () => [
      {
        subheader: 'Menu',
        items: [
          { title: 'Table de bord', path: paths.dashboard.tableDeBord, icon: ICONS.dashboard },
          { title: 'Gestion des lots', path: paths.dashboard.gestionsDesLots, icon: ICONS.file },
          { title: 'Gestion des dossiers', path: paths.dashboard.gestionsDesDossiers, icon: ICONS.folder },
          { title: 'Gestion des utlisateurs', path: paths.dashboard.gestionsDesUtlisateurs, icon: ICONS.user }
        ],
      }
    ],
    []
  );

  return data;
};