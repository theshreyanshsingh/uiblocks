import { createSlice } from '@reduxjs/toolkit';

interface ProjectFilesState {
  files: unknown;
}

const initialState: ProjectFilesState = {
  files: null,
};

const projectFilesSlice = createSlice({
  name: 'projectFiles',
  initialState,
  reducers: {
    setprojectFiles: (state, action) => {
      state.files = action.payload;
    },
  },
});

export const { setprojectFiles } = projectFilesSlice.actions;
export default projectFilesSlice.reducer;
