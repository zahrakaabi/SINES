'use client';

/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { createContext } from 'react';

// Local Components
import { JWTContextType } from '../../types';

/* -------------------------------------------------------------------------- */
/*                                AUTH CONTEXT                                */
/* -------------------------------------------------------------------------- */
export const AuthContext = createContext({} as JWTContextType);