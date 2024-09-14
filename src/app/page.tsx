'use client';

/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useEffect } from 'react';

// UI Local Components
import { useRouter } from 'src/routes/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

/* -------------------------------------------------------------------------- */
/*                                  HOME PAGE                                 */
/* -------------------------------------------------------------------------- */
function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push(PATH_AFTER_LOGIN);
  }, [router]);

  return null;
};

export default HomePage;