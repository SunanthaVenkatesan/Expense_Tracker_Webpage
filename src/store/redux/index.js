import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: null,
  isAuthenticated:!!localStorage.getItem('token')
};

const initialExpenseState = {
  expenses: {},
};

const initialThemeState = {
  darkTheme: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    onTokenreceive(state, action) {
      state.token = action.payload;
    },
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    onAddOrGetExpense(state, action) {
      state.expenses = action.payload;
    },
    totalExpense(state) {
      console.log(`total expense`);
    },
  },
});

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    onThemeChange(state) {
        console.log(`inside onThemeChange`)
      state.darkTheme = !state.darkTheme;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expense: expenseSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const expenseActions = expenseSlice.actions;
export const themeActions = themeSlice.actions;

export default store;
