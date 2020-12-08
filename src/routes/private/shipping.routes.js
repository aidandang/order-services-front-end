import ShippingList from '../../components/shipping/shipping-list.component';
import ShippingAdd from '../../components/shipping/shipping-add.component';
import Shipping from '../../components/shipping/shipping.component';

const routes = [
  { path: "/app/shipping", name: "Search for Shipments", Component: ShippingList },
  { path: "/app/shipping/add", name: "Create a New Shipment", Component: ShippingAdd },
  { path: "/app/shipping/:shipmentId", name: "Shipment Details", Component: Shipping }
];

export default routes;