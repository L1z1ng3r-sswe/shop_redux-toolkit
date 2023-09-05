import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { EStatus } from "../ProductsSlice/types";
import { IInitialState, TRegister, TUser, TLogin } from "./type";
import { ADMINS } from "../../../utiles/consts";

// Create an async thunk for user login
export const login = createAsyncThunk<TUser, TLogin, { rejectValue: string }>(
  "auth/login",
  async (credential, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credential.email,
        credential.password
      );
      // Extract user data from the auth result
      const user = {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        phoneNumber: userCredential.user.phoneNumber,
      };
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      // Reject with an error message if login fails
      return rejectWithValue(error.message as string);
    }
  }
);

// Create an async thunk for user registration
export const register = createAsyncThunk<
  TUser,
  TRegister,
  { rejectValue: string }
>("auth/register", async (credential, { rejectWithValue }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      credential.email,
      credential.password
    );

    // Update user profile data
    await updateProfile(auth.currentUser, {
      displayName: credential.displayName,
      phoneNumber: credential.phoneNumber,
      photoURL: credential.photoURL,
    });

    // Extract user data from the registration result
    const user = {
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
      phoneNumber: userCredential.user.phoneNumber,
    };
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (error: any) {
    // Reject with an error message if registration fails
    return rejectWithValue(error.message as string);
  }
});

// Create an async thunk for user logout
export const logout = createAsyncThunk<null, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");

      return null; // Return null when logout is successful
    } catch (error: any) {
      // Reject with an error message if registration fails
      return rejectWithValue(error.message as string);
    }
  }
);
// check user is Admin
export function IsAdmin(user: TUser | null) {
  if (!user) {
    return false; // If the user is not logged in, consider them not an admin
  }
  return ADMINS.includes(user.email); // Check if the user's email is in the list of admin emails
}

// Define the initial state of the authentication slice
const initialState: IInitialState = {
  user: null,
  status: EStatus.idle,
  error: null,
};

// Create the authentication slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer to set the user data in the state
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handling loading and error states for login, registration, and logout
    builder
      .addCase(login.pending, (state) => {
        state.status = EStatus.loading;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = EStatus.idle;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = EStatus.error;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = EStatus.loading;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = EStatus.idle;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = EStatus.error;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = EStatus.loading;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = EStatus.idle;
        state.error = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.status = EStatus.error;
        state.error = payload;
      });
  },
});

// Export the setUser reducer and the default reducer
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
