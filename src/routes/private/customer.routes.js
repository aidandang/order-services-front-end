import CustomerList from '../../components/customer/customer-list.component'
import CustomerAdd from '../../components/customer/customer-add.component'

const routes = [
  { path: "/app/customer", name: "Search for Customer", Component: CustomerList },
  { path: "/app/customer/add", name: "Add Customer", Component: CustomerAdd }
];

export default routes