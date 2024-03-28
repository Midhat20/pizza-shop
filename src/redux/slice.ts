// ordersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "./store";

export interface Order {
  id: string;
  stage: string;
  timeSpent: string;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [{ id: "", stage: "", timeSpent: "" }],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    updateOrderStatus(
      state,
      action: PayloadAction<{ orderId: string; stage?: string }>
    ) {
      const { orderId, stage } = action.payload;
      const order = state.orders.find((order) => order.id === orderId);
      if (order && stage) {
        order.stage = stage;
      }
    },
  },
});

export const { createOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;

export type RootState = ReturnType<typeof store.getState>;
