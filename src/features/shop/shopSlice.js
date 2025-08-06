import { createSlice } from "@reduxjs/toolkit";
import categories from "../../data/categories.json";
import clothes from "../../data/clothes.json";

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        categories,
        clothes,
        categorySelected: "",
        clothesFilteredByCategory: [],
        clothSelected: {},
    },
    reducers: {
        setCategorySelected: (state, action) => {
            state.categorySelected = action.payload;
        },
        filteredClothes: (state, action) => {
            state.clothesFilteredByCategory = clothes.filter(cloth => cloth.category.toLowerCase() === state.categorySelected.toLowerCase())
        },
        setClothSelected: (state, action) => {
            state.clothSelected = action.payload;
        },
    },
});

export const { setCategorySelected, filteredClothes, setClothSelected } = shopSlice.actions;
export default shopSlice.reducer;