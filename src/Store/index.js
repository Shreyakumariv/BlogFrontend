import { configureStore, createSlice } from '@reduxjs/toolkit'

const LoginSlice = createSlice({
    name: "Login",
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true
        },
        logout(state) {
            state.isLoggedIn = false
        },

    }
})
export const loginActions = LoginSlice.actions
export const Store = configureStore({
    reducer: LoginSlice.reducer
})