'use client';

/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useMemo, useEffect, useReducer, useCallback } from 'react';

// Local Components
import axios, { endpoints } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';

/* -------------------------------------------------------------------------- */
/*                               TYPES & CONSTS                               */
/* -------------------------------------------------------------------------- */
enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

/* -------------------------------------------------------------------------- */
/*                                   REDUCER                                  */
/* -------------------------------------------------------------------------- */
const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

/* -------------------------------------------------------------------------- */
/*                                AUTH PROVIDR                                */
/* -------------------------------------------------------------------------- */
const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
/* ---------------------------------- HOOKS --------------------------------- */
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  /* ---------------------------------- LOGIN --------------------------------- */
  const login = useCallback(async (username: string, password: string) => {
    const data = {
      username,
      password,
    };

    const res = await axios.post(endpoints.auth.login, data);
    const { token } = res.data;
    setSession(token);

    dispatch({
      type: Types.LOGIN,
      payload: { user: { token } },
    });
  }, []);

/* --------------------------------- LOGOUT --------------------------------- */
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);


/* ----------------------------- OTHER CONSTANTS ---------------------------- */
  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
      logout,
    }),
    [login, logout, state.user, status]
  );

/* -------------------------------- RENDERING ------------------------------- */
  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};