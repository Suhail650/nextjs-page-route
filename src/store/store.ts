import cartReducer from "@/features/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
