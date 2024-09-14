/* -------------------------------------------------------------------------- */
/*                               ACTION MAP TYPE                              */
/* -------------------------------------------------------------------------- */
export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

/* -------------------------------------------------------------------------- */
/*                               AUTH USER TYPE                               */
/* -------------------------------------------------------------------------- */
export type AuthUserType = null | Record<string, any>;

/* -------------------------------------------------------------------------- */
/*                               AUTH STATE TYPE                              */
/* -------------------------------------------------------------------------- */
export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};

/* -------------------------------------------------------------------------- */
/*                               TYPE CAN REMOVE                              */
/* -------------------------------------------------------------------------- */
type CanRemove = {
  login?: (username: string, password: string) => Promise<void>
};

/* -------------------------------------------------------------------------- */
/*                              JWT CONTEXT TYPE                              */
/* -------------------------------------------------------------------------- */
export type JWTContextType = CanRemove & {
  user: AuthUserType;
  method: string;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};