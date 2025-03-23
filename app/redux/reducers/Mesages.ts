import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessagesState {
  messages: Array<unknown>;
  text: string | null;
}

// Initial state is empty
const initialState: MessagesState = {
  messages: [],
  text: null,
};

// Create the slice
const messagesProvider = createSlice({
  name: 'messagesprovider',
  initialState,
  reducers: {
    setmessages: (state, action: PayloadAction<MessagesState>) => {
      return {
        ...state,
        messages: action.payload.messages,
      };
    },
    sendaMessage: (state, action: PayloadAction<MessagesState>) => {
      const text = action.payload.text;
      return {
        ...state,
        messages: [...state.messages, text],
      };
    },
  },
});

export const { setmessages, sendaMessage } = messagesProvider.actions;
export default messagesProvider.reducer;
