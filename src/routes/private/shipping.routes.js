import ShippingList from '../../components/shipping/shipping-list.component';
import ShippingAdd from '../../components/shipping/shipping-add.component';

const routes = [
  { path: "/app/shipping", name: "Search for Shipments", Component: ShippingList },
  { path: "/app/shipping/add", name: "Create a New Shipment", Component: ShippingAdd }
];

export default routes;