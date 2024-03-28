import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus, updateOrderTime } from "../../redux/action";
import { ORDER_STAGES } from "../../constants.util";
import { useStyles } from "./pizzaStageSection.styles";
import { RootState } from "../../redux/slice";

/**
 * Method to render pizza section
 * @returns {JSX.Element}
 */
const PizzaStageSection = () => {
  const orders = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch();
  const styles = useStyles();

  // Update order time every second
  useEffect(() => {
    const interval = setInterval(() => {
      orders.forEach((order: any) => {
        dispatch(
          order.stage !== ORDER_STAGES.order_picked
            ? updateOrderTime(order.orderId, order.time + 1)
            : updateOrderTime(order.orderId, order.time)
        );
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, orders]);

  /**
   * Method to handle next button click
   * @param {string} orderId
   * @param {string} currentStage
   */
  const handleNextButtonClick = (orderId: string, currentStage: string) => {
    switch (currentStage) {
      case ORDER_STAGES.order_placed:
        dispatch(updateOrderStatus(orderId, ORDER_STAGES.order_in_making));
        break;
      case ORDER_STAGES.order_in_making:
        dispatch(updateOrderStatus(orderId, ORDER_STAGES.order_ready));
        break;
      case ORDER_STAGES.order_ready:
        dispatch(updateOrderStatus(orderId, ORDER_STAGES.order_picked));
        break;
      default:
        console.log("invalid stage", currentStage);
    }
  };

  // stages of orders
  const stages = [
    "Order Placed",
    "Order in Making",
    "Order Ready",
    "Order Picked",
  ];
  // Check if order exists
  const hasOrderExists = orders.filter(
    (order: any) => order?.orderId === orders[orders.length - 1]?.orderId
  ).length;

  return (
    <>
      <h2 style={styles.wrapper}>Pizza Stages</h2>
      <div style={styles.container}>
        {stages.map((stage) => (
          <div key={stage} style={styles.stageCard}>
            <h3 style={styles.wrapper}>{stage}</h3>
            {hasOrderExists <= 0 ? (
              <p style={styles.wrapper}>No order exists</p>
            ) : (
              orders
                .filter((order: any) => order.stage === stage)
                .sort((a: any, b: any) => a.time - b.time)
                .map((order: any) => (
                  <div
                    key={order.orderId}
                    style={{
                      ...styles.orderCard,
                      ...(order.time > 180 ? styles.alertBg : null),
                    }}
                  >
                    <p>Order Id: {order.orderId}</p>
                    <p>
                      {order.time < 60
                        ? `${order.time} sec`
                        : `${Math.floor(order.time / 60)} min ${
                            order.time % 60
                          } sec`}
                    </p>{" "}
                    <div>
                      {order.stage !== ORDER_STAGES.order_picked && (
                        <button
                          onClick={() =>
                            handleNextButtonClick(order.orderId, order.stage)
                          }
                        >
                          Next
                        </button>
                      )}
                      {order.stage === ORDER_STAGES.order_picked && (
                        <p>Order Picked</p>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default PizzaStageSection;
