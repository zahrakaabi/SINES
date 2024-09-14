'use client';

/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useContext } from 'react';

// UI Local Components
import { AuthContext } from '../context/jwt/auth-context';

/* -------------------------------------------------------------------------- */
/*                         USE AUTH CONTEXT COMPONENT                         */
/* -------------------------------------------------------------------------- */
export const useAuthContext = () => {
/* -------------------------------- CONSTANTS ------------------------------- */
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');
  
/* -------------------------------- RENDERING ------------------------------- */
  return context;
};