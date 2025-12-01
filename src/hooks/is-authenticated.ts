import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '@/store/slices/auth-slice';

export const useIsAuthenticated = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated;
};
