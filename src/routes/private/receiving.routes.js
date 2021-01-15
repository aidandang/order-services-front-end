import ReceivingList from '../../components/receiving/receiving-list.comp';
import ReceivingAdd from '../../components/receiving/receiving-add.comp';

const routes = [
  { path: "/app/receiving", name: "Search for Tracking Number", Component: ReceivingList },
  { path: "/app/receiving/add", name: "Scan Received Packages", Component: ReceivingAdd }
];

export default routes;