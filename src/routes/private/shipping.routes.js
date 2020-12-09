import ShippingList from '../../components/shipping/shipping-list.component';
import ShippingAdd from '../../components/shipping/shipping-add.component';
import Shipping from '../../components/shipping/shipping.component';
import ShippingInfoForm  from '../../components/shipping/shipping-info-form.component';

const routes = [
  { path: "/app/shipping", name: "Search for Shipments", Component: ShippingList },
  { path: "/app/shipping/add", name: "Create a New Shipment", Component: ShippingAdd },
  { path: "/app/shipping/:shipmentId", name: "Shipment Details", Component: Shipping },
  { path: "/app/shipping/:shipmentId/update-shipment-info", name: "Update Shipment Information", Component: ShippingInfoForm }
];

export default routes;