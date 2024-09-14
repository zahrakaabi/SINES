/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useEffect, useCallback } from 'react';

// Locaal Components
import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { SplashScreen } from 'src/components/loading-screen';
import { useAuthContext } from '../hooks';

/* -------------------------------------------------------------------------- */
/*                                 GUEST GUARD                                */
/* -------------------------------------------------------------------------- */
type Props = {
  children: React.ReactNode;
};

function GuestGuard({ children }: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { loading } = useAuthContext();

/* -------------------------------- RENDERING ------------------------------- */
  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
};

export default GuestGuard; 

/* -------------------------------------------------------------------------- */
/*                                  CONTAINER                                 */
/* -------------------------------------------------------------------------- */
function Container({ children }: Props) {
/* ---------------------------------- HOOKS --------------------------------- */
  const router = useRouter();
  const searchParams = useSearchParams();
 
  const returnTo = searchParams.get('returnTo') || paths.dashboard.root; // ici
  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

/* -------------------------------- RENDERING ------------------------------- */
  return <>{children}</>;
};