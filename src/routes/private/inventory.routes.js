import Inventory from '../../components/inventory/inventory.comp'
import ReceivedTrackings from '../../components/inventory/received-trackings.comp'
import ReceivedCheck from '../../components/inventory/received-check.comp'
import ReceivedProcess from '../../components/inventory/received-process.comp'
import IncomingOrders from '../../components/inventory/imcoming-orders.comp'
import InStoreOrders from '../../components/inventory/in-store-orders.comp'

const routes = [
  { path: "/app/inventory", name: "Inventory Information", Component: Inventory },
  { path: "/app/inventory/received-trackings", name: "Received Trackings", Component: ReceivedTrackings },
  { path: "/app/inventory/received-trackings/check/:trackingId", name: "Checking", Component: ReceivedCheck },
  { path: "/app/inventory/received-trackings/process/:trackingId", name: "Processing", Component: ReceivedProcess },
  { path: "/app/inventory/incoming-orders", name: "Incoming Orders", Component: IncomingOrders },
  { path: "/app/inventory/in-store-orders", name: "In-Store Orders", Component: InStoreOrders }
];

export default routes