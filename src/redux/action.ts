let orderIdCounter = 0;

export const placeOrder = (order: any) => {
  const orderId = `00${++orderIdCounter}`;
  return {
    type: "PLACE_ORDER",
    payload: { ...order, orderId, stage: "Order Placed", time: 0, prevTime: 0 },
  };
};

export const updateOrderStatus = (orderId: string, stage: string) => ({
  type: "UPDATE_ORDER_STAGE",
  payload: { orderId, stage },
});

export const cancelOrder = (orderId: string) => ({
  type: "CANCEL_ORDER",
  payload: orderId,
});

export const updateOrderTime = (orderId: string, time: string) => ({
  type: "UPDATE_ORDER_TIME",
  payload: { orderId, time },
});
