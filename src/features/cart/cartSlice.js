import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        user: '',
        updateAt: new Date().toLocaleString(),
        cartItems: [],
        total: 0,
    },
    reducers: {
        addItems: (state, action) => {
            const { cloth, quantity } = action.payload
            const productInCart = state.cartItems.find(item => item.id === cloth.id)
            if (!productInCart) {
                state.cartItems.push({ ...cloth, quantity })
            } else {
                productInCart.quantity += quantity
            }
            state.updateAt = new Date().toLocaleString()
            state.total = state.cartItems.reduce((acu, item) => acu + (item.price * item.quantity), 0)
        },
        removeItems: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
            state.total = state.cartItems.reduce((acu, item) => acu + (item.price * item.quantity), 0)
            state.updateAt = new Date().toLocaleString()

        },
        deleteCart: (state, action) => {
            state.cartItems = []
            state.updateAt = new Date().toLocaleString()
            state.total = 0
        },
    }
})

export const { addItems, removeItems, deleteCart } = cartSlice.actions

export default cartSlice.reducer