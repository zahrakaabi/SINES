/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useState, useEffect, useCallback } from 'react';

// Local Components
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { SplashScreen } from 'src/components/loading-screen';
import { useAuthContext } from '../hooks';

/* -------------------------------------------------------------------------- */
/*                                 AUTH GUARD                                 */
/* -------------------------------------------------------------------------- */
const loginPaths: Record<string, string> = {
  jwt: paths.auth.jwt.login,
};

type Props = {
  children: React.ReactNode;
};

function AuthGuard({ children }: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const { loading } = useAuthContext();

/* -------------------------------- RENDERING ------------------------------- */
  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
};

export default AuthGuard;

/* -------------------------------------------------------------------------- */
/*                                  CONTAINER                                 */
/* -------------------------------------------------------------------------- */
function Container({ children }: Props) {
/* ---------------------------------- HOOKS --------------------------------- */
  const router = useRouter();
  const { authenticated, method } = useAuthContext();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = loginPaths[method];
      const href = `${loginPath}?${searchParams}`;
      router.replace(href);
      
    } else {
      setChecked(true);
    }
  }, [authenticated, method, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

/* -------------------------------- RENDERING ------------------------------- */
  return <>{children}</>;
};