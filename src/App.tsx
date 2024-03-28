import "./styles.css";
import PizzaStageSection from "./components/pizzaStageSection";
import OrderDetailSection from "./components/orderDetailSection";
import PlaceOrder from "./components/placeOrder";

export default function App() {
  return (
    <div>
      <PlaceOrder />
      <PizzaStageSection />
      <OrderDetailSection />
    </div>
  );
}
