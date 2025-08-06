import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: "",
        localId: "",
        profilePicture: "",
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.email
            state.localId = action.payload.localId;
        },
        clearUser: (state) => {
            state.user = "";
            state.localId = "";
            state.profilePicture = "";
        },
        setProfilePicture: (state, action) => {
            state.profilePicture = action.payload;
        }
    },
});

export const { setUser, clearUser, setProfilePicture } = userSlice.actions;
export default userSlice.reducer;