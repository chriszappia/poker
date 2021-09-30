import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Define a type for the slice state
interface UserState {
  userId: string,
  userName: string,
}

// Define the initial state using that type
const initialState: UserState = {
    userId: uuidv4(),
    userName: "Anonymous",
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export const { setUserId } = userSlice.actions;
export const { setUserName } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// TODO do i need this?
// export const selectUserId = (state: RootState) => state.user.userId;


export default userSlice.reducer;