import Inventory from '../../components/inventory/inventory.comp'
import ReceivedTrackings from '../../components/inventory/received-trackings.comp'
import ReceivedTrackingsCheck from '../../components/inventory/received-trackings-check.comp'
import ReceivedTrackingsById from '../../components/inventory/received-trackings-by-id.comp'
import ReceivedTrackingsProcess from '../../components/inventory/received-trackings-process.comp'
import IncomingItems from '../../components/inventory/imcoming-items.comp'
import InStoreItems from '../../components/inventory/in-store-items.comp'

const routes = [
  { path: "/app/inventory", name: "Inventory Information", Component: Inventory },
  { path: "/app/inventory/received-trackings", name: "Received Trackings", Component: ReceivedTrackings },
  { path: "/app/inventory/received-trackings/:trackingId", name: "Tracking", Component: ReceivedTrackingsById },
  { path: "/app/inventory/received-trackings/check", name: "Check", Component: ReceivedTrackingsCheck },
  { path: "/app/inventory/received-trackings/process", name: "Process", Component: ReceivedTrackingsProcess },
  { path: "/app/inventory/incoming-items", name: "Placed Orders", Component: IncomingItems },
  { path: "/app/inventory/in-store-items", name: "In-Store Items", Component: InStoreItems }
];

export default routes