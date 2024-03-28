import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../redux/action";
import { RootState } from "../../redux/slice";
import { useStyles } from "./placeOrder.styles";

/**
 * Component for placing pizza orders.
 * @returns {JSX.Element}
 */
const PlaceOrder = (): JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders);
  const styles = useStyles();

  const [order, setOrder] = useState({ type: "", size: "", base: "" });
  const [errors, setErrors] = useState({
    type: "",
    size: "",
    base: "",
    maxOrder: "",
  });

  /**
   * Validates the input fields for pizza order.
   * @returns {boolean}
   */
  const validateInputs = (): boolean => {
    let hasErrors = false;
    const newErrors = { type: "", size: "", base: "", maxOrder: "" };

    if (!order.type) {
      newErrors.type = "Please select a pizza type.";
      hasErrors = true;
    }
    if (!order.size) {
      newErrors.size = "Please select a pizza size.";
      hasErrors = true;
    }
    if (!order.base) {
      newErrors.base = "Please select a pizza base.";
      hasErrors = true;
    }

    setErrors(newErrors);
    return hasErrors;
  };

  /**
   * Handles changes in the input fields.
   * @param {React.ChangeEvent<HTMLSelectElement>} event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  /**
   * Handles the placement of the pizza order.
   */
  const handlePlaceOrder = () => {
    if (orders.length >= 10) {
      setErrors({
        ...errors,
        maxOrder: "Not taking any more orders for now. Please try again later.",
      });
      return;
    }

    if (validateInputs()) {
      return;
    }

    dispatch(placeOrder(order));
    setOrder({ type: "", size: "", base: "" });
  };

  return (
    <div style={styles.menuWrapper}>
      <h2 style={styles.contentWrapper}>Pizza Menu</h2>
      <form style={styles.formWrapper}>
        {(["type", "size", "base"] as const).map((fieldName) => (
          <label key={fieldName} style={styles.label}>
            Pizza {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
            <select
              name={fieldName}
              value={order[fieldName]}
              onChange={handleInputChange}
              style={styles.select}
            >
              <option value="">
                Select {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              </option>
              {fieldName === "type" ? (
                <>
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                </>
              ) : (
                <>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </>
              )}
            </select>
            <div style={styles.errorWrapper}>{errors[fieldName]}</div>
          </label>
        ))}
        <button
          type="button"
          onClick={handlePlaceOrder}
          style={styles.placeBtn}
        >
          Place Order
        </button>
        {errors.maxOrder && (
          <div style={styles.errorWrapper}>{errors.maxOrder}</div>
        )}
      </form>
    </div>
  );
};

export default PlaceOrder;
