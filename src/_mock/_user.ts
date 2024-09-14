/* -------------------------------------------------------------------------- */
/*                                 DPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Local Components
import { _mock } from './_mock';

/* -------------------------------------------------------------------------- */
/*                                 USER LIST                                  */
/* -------------------------------------------------------------------------- */
export const _users = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  firstName: _mock.firstName(index),
  lastName: _mock.lastName(index),
  codeUser: _mock.codeUser(index),
  role: _mock.role(index),
  password: _mock.password(index),
  comfirmPassword: _mock.comfirmPassword(index),
  status: _mock.status(index)
}));