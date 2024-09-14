import { _mock } from 'src/_mock';
import { ASSETS_API } from 'src/config-global';

// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    NOM: 'Admin',
    PRENOM: 'Admin',
    role: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
    roles: 'ROLE_ADMIN',
    photoURL: `${ASSETS_API}/assets/images/avatar/avatar_24}.jpg`,
    isPublic: true,
  };

  return { user };
}
