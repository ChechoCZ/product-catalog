import { useDispatch, useSelector } from 'react-redux';

import { selectFilters, setFilters } from '@/store/slices/filters-slice';
import { Filters } from '@/types';

export const useFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const updateFilters = (updates: Partial<Filters>) => {
    dispatch(setFilters(updates));
  };

  return { filters, updateFilters };
};
