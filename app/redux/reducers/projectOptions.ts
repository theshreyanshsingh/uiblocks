import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlanState {
  fullscreen: boolean;
  mode: 'edit' | 'split' | 'code';
  responsive: 'desktop' | 'mobile';
  loading: boolean | null;
}

// Initial state is empty
const initialState: PlanState = {
  fullscreen: false,
  mode: 'edit',
  responsive: 'desktop',
  loading: null,
};

// Create the slice
const projectOptions = createSlice({
  name: 'projectoptions',
  initialState,
  reducers: {
    setprojectOptions: (state, action: PayloadAction<PlanState>) => {
      return {
        ...state,
        fullscreen: action.payload.fullscreen,
        mode: action.payload.mode,
        responsive: action.payload.responsive,
      };
    },
    setProjectMode: (state, action: PayloadAction<{ mode: 'edit' | 'split' | 'code' }>) => {
      return {
        ...state,
        mode: action.payload.mode,
      };
    },
    setResponsivess: (state, action: PayloadAction<{ responsive: 'desktop' | 'mobile' }>) => {
      return {
        ...state,
        responsive: action.payload.responsive,
      };
    },
    setFullscreen: (state, action: PayloadAction<{ fullscreen: boolean }>) => {
      return {
        ...state,
        fullscreen: action.payload.fullscreen,
      };
    },
  },
});

export const { setprojectOptions, setProjectMode, setResponsivess, setFullscreen } = projectOptions.actions;
export default projectOptions.reducer;
