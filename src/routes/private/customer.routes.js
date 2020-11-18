import CustomerList from '../../components/customer/customer-list.component';
import CustomerAdd from '../../components/customer/customer-add.component';
import CustomerEdit from '../../components/customer/customer-edit.component';
import CustomerInfo from '../../components/customer/customer-info.component';
import CustomerShippingInfo from '../../components/customer/customer-shipping-info.component';

const routes = [
  { path: "/app/customer", name: "Search for Customer", Component: CustomerList },
  { path: "/app/customer/add", name: "Add Customer", Component: CustomerAdd },
  { path: "/app/customer/:customerId", name: "Customer Details", Component: CustomerInfo },
  { path: "/app/customer/:customerId/edit", name: "Edit Customer", Component: CustomerEdit },
  { path: "/app/customer/:customerId/shipping-info", name: "Update Shipping Addresses", Component: CustomerShippingInfo }
];

export default routes