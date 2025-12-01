import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

import { Filters } from '@/types';

const initialState: Filters = {
  category: undefined,
  search: undefined,
  sortBy: undefined,
  minPrice: undefined,
  maxPrice: undefined,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      Object.assign(state, action.payload);
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;

export const selectFilters = (state: RootState) => state.filters;
