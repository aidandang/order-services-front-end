import CustomerList from '../../components/customer/customer-list.comp'
import CustomerAdd from '../../components/customer/customer-add.comp'

const routes = [
  { path: "/app/customer", name: "Search for Customer", Component: CustomerList },
  { path: "/app/customer/add", name: "Add Customer", Component: CustomerAdd }
];

export default routes