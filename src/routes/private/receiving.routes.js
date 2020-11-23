import ReceivingList from '../../components/receiving/receiving-list.component';
import ReceivingAdd from '../../components/receiving/receiving-add.component';

const routes = [
  { path: "/app/receiving", name: "Search for Tracking Number", Component: ReceivingList },
  { path: "/app/receiving/add", name: "Scan Received Packages", Component: ReceivingAdd }
];

export default routes;