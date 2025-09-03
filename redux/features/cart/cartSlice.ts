// redux/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  [key: string]: any;
};

type CartState = {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
};

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const recalc = (state: CartState) => {
  state.totalQuantity = state.items.reduce((s, i) => s + i.quantity, 0);
  state.totalAmount = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      console.log("cart slich",item);
      
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity ?? 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity ?? 1 });
      }
      recalc(state);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      recalc(state);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const { id, quantity } = action.payload;
      const itm = state.items.find((i) => i.id === id);
      if (itm) itm.quantity = quantity;
      state.items = state.items.filter((i) => i.quantity > 0);
      recalc(state);
    },
    clearCart(state) {
      state.items = [];
      recalc(state);
    },
    // load/set cart (used for hydration from localStorage)
    setCart(state, action: PayloadAction<Partial<CartState>>) {
      state.items = action.payload.items ?? [];
      state.totalQuantity = action.payload.totalQuantity ?? 0;
      state.totalAmount = action.payload.totalAmount ?? 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
