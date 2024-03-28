interface Order {
  orderId: string;
  stage: string;
  time: string;
}

interface PizzaState {
  orders: Order[];
  orderIdCounter: number;
}

const initialState: PizzaState = {
  orders: [],
  orderIdCounter: 0,
};

const PLACE_ORDER = "PLACE_ORDER";
const UPDATE_ORDER_STAGE = "UPDATE_ORDER_STAGE";
const CANCEL_ORDER = "CANCEL_ORDER";
const UPDATE_ORDER_TIME = "UPDATE_ORDER_TIME";

type PizzaAction =
  | { type: typeof PLACE_ORDER; payload: Order }
  | {
      type: typeof UPDATE_ORDER_STAGE;
      payload: { orderId: string; stage: string };
    }
  | { type: typeof CANCEL_ORDER; payload: string }
  | {
      type: typeof UPDATE_ORDER_TIME;
      payload: { orderId: string; time: string };
    };

const pizzaReducer = (
  state = initialState,
  action: PizzaAction
): PizzaState => {
  switch (action.type) {
    case PLACE_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        orderIdCounter: state.orderIdCounter + 1,
      };
    case UPDATE_ORDER_STAGE:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderId === action.payload.orderId
            ? { ...order, stage: action.payload.stage }
            : order
        ),
      };
    case CANCEL_ORDER:
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order.orderId !== action.payload
        ),
      };
    case UPDATE_ORDER_TIME:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderId === action.payload.orderId
            ? { ...order, time: action.payload.time }
            : order
        ),
      };
    default:
      return state;
  }
};

export default pizzaReducer;
