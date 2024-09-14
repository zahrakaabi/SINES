'use client';

/* -------------------------------------------------------------------------- */
/*                                DEPENDENICES                                */
/* -------------------------------------------------------------------------- */
// Local Components
import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';

/* -------------------------------------------------------------------------- */
/*                              LAYOUT COMPONENT                              */
/* -------------------------------------------------------------------------- */
type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <GuestGuard>
      <AuthClassicLayout>{children}</AuthClassicLayout>
    </GuestGuard>
  );
};

export default Layout;