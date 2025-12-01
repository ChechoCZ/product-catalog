import { createSlice } from '@reduxjs/toolkit';

type ModalState = {
  isOpen: boolean;
};

const initialState: ModalState = {
  isOpen: false,
};

const createProductModalSlice = createSlice({
  name: 'createProductModal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openModal, closeModal, toggleModal } = createProductModalSlice.actions;
export default createProductModalSlice.reducer;
