import Inventory from '../../components/inventory/inventory.comp'
import ReceivedTrackings from '../../components/inventory/received-trackings.comp'
import ReceivedCheck from '../../components/inventory/received-check.comp'
import ReceivedProcess from '../../components/inventory/received-process.comp'
import IncomingItems from '../../components/inventory/imcoming-items.comp'
import InStoreItems from '../../components/inventory/in-store-items.comp'

const routes = [
  { path: "/app/inventory", name: "Inventory Information", Component: Inventory },
  { path: "/app/inventory/received-trackings", name: "Received Trackings", Component: ReceivedTrackings },
  { path: "/app/inventory/received-trackings/check/:trackingId", name: "Checking", Component: ReceivedCheck },
  { path: "/app/inventory/received-trackings/process/:trackingId", name: "Processing", Component: ReceivedProcess },
  { path: "/app/inventory/incoming-items", name: "Placed Orders", Component: IncomingItems },
  { path: "/app/inventory/in-store-items", name: "In-Store Items", Component: InStoreItems }
];

export default routes