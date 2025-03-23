import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  name: string | null;
  plan: string | null;
  prompt: string | null;
  loginModalOpen: boolean;
  authenticated: boolean | null;
  email: string | null;
  projectId: string | null;
  BetaOpen: boolean;
}

// Initial state is empty
const initialState: userState = {
  name: null,
  plan: null,
  prompt: null,
  loginModalOpen: false,
  authenticated: null,
  email: null,
  projectId: null,
  BetaOpen: false,
};

// Create the slice
const basicData = createSlice({
  name: 'basicData',
  initialState,
  reducers: {
    setbasicData: (state, action: PayloadAction<userState>) => {
      return {
        ...state,
        name: action.payload.name,
        plan: action.payload.plan,
      };
    },
    setAuthenticated: (
      state,
      action: PayloadAction<{
        authStatus: boolean;
        name: string;
        email: string;
        projectId: string;
      }>,
    ) => {
      return {
        ...state,
        authenticated: action.payload.authStatus,
        name: action.payload.name,
        email: action.payload.email,
        projectId: action.payload.projectId,
      };
    },
    setLoginModalOpen: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loginModalOpen: action.payload,
      };
    },
    setBetaModalOpen: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        BetaOpen: action.payload,
      };
    },
  },
});

export const { setbasicData, setLoginModalOpen, setAuthenticated, setBetaModalOpen } = basicData.actions;
export default basicData.reducer;
