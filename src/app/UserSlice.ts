import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { RootState } from './store';

// Define a type for the slice state
interface UserState {
  userId: string
}

// Define the initial state using that type
const initialState: UserState = {
    userId: uuidv4(),
}

export const userSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
})

export const { setUserId } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserId = (state: RootState) => state.user.userId;

export default userSlice.reducer