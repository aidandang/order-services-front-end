import Inventory from '../../components/inventory/inventory.component'
import ReceivedTrackings from '../../components/inventory/received-trackings.component'
import ReceivedTrackingsCheck from '../../components/inventory/received-trackings-check.component'

const routes = [
  { path: "/app/inventory", name: "Inventory Information", Component: Inventory },
  { path: "/app/inventory/received-trackings", name: "Received Trackings", Component: ReceivedTrackings },
  { path: "/app/inventory/received-trackings/check", name: "Check", Component: ReceivedTrackingsCheck }
];

export default routes