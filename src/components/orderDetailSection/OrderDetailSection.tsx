import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder } from "../../redux/action";
import { useStyles } from "./orderDetailSection.styles";
import { ORDER_STAGES } from "../../constants.util";
import { RootState } from "../../redux/slice";

/**
 * Method to dsplay the order details
 * @returns {JSX.Element}
 */
const OrderDetailSection = (): JSX.Element => {
  const orders = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch();
  const styles = useStyles();

  // Calculate total pizzas delivered today
  const totalPizzasDeliveredToday = orders.filter(
    (order: any) => order?.stage === ORDER_STAGES.order_picked
  ).length;

  // Check if order exists
  const hasOrderExists = orders.filter(
    (order: any) => order?.orderId === orders[orders.length - 1]?.orderId
  ).length;

  /**
   * Method to cancel order
   * @param {string} orderId
   */
  const handleCancelOrder = (orderId: string) => {
    dispatch(cancelOrder(orderId));
  };

  /**
   * Method to render table heading
   * @returns {JSX.Element}
   */
  const renderTableHeaderCells = () => {
    const headerTitles = ["Order Id", "Stage", "Total time spent", "Action"];
    return headerTitles.map((title: string) => (
      <th key={`header${title}`} style={styles.table}>
        {title}
      </th>
    ));
  };

  return (
    <div>
      <h2 style={styles.contentWrapper}>Dashboard</h2>
      <table style={styles.tableContainer}>
        <thead>
          <tr>{hasOrderExists > 0 && renderTableHeaderCells()}</tr>
        </thead>
        <tbody>
          {orders.map((order: IOrder) => (
            <tr key={order.orderId}>
              <td style={styles.table}>{order.orderId}</td>
              <td style={styles.table}>{order.stage}</td>
              <td style={styles.table}>{order.time} sec</td>
              <td style={styles.table}>
                {order.stage !== ORDER_STAGES.order_picked && (
                  <button onClick={() => handleCancelOrder(order.orderId)}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.totalDeliveredOrder}>
        <h3 style={styles.contentWrapper}>
          Total order delivered : {totalPizzasDeliveredToday}
        </h3>
      </div>
    </div>
  );
};

export default OrderDetailSection;
