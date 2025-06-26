import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/interfaces/product";

export interface CartState {
  cart: IProduct[];
  loading: boolean;
}

const initialState: CartState = {
  cart: [],
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload;
      const isProductInCart = state.cart.some((item) => item.id === product.id);
      if (!isProductInCart) {
        state.cart.push(product);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, setCartLoading, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
