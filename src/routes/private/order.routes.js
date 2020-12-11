import OrderList from '../../components/order/order-list.component';
import OrderAdd from '../../components/order/order-add.component';
import Order from '../../components/order/order.component';
import OrderPurchasingForm from '../../components/order/order-purchasing-form.component';
import OrderSellingForm from '../../components/order/order-selling-form.component';
import ProductList from '../../components/product/product-list.component';
import ProductInfo from '../../components/product/product-info.component';
import ProductEdit from '../../components/product/product-edit.component';
import ProductAdd from '../../components/product/product-add.component';
import CustomerList from '../../components/customer/customer-list.component';
import CustomerInfo from '../../components/customer/customer-info.component';
import CustomerEdit from '../../components/customer/customer-edit.component';
import CustomerAdd from '../../components/customer/customer-add.component';
import CustomerShipingInfo from '../../components/customer/customer-shipping-info.component';

const routes = [
  { path: "/app/order", name: "Search for Order", Component: OrderList },
  { path: "/app/order/add", name: "Add Order", Component: OrderAdd },
  { path: "/app/order/add/select-customer", name: "Select Customer", Component: CustomerList },
  { path: "/app/order/add/select-customer/add", name: "Add Customer", Component: CustomerAdd },
  { path: "/app/order/add/select-customer/:customerId", name: "Customer Details", Component: CustomerInfo },
  { path: "/app/order/add/select-customer/:customerId/edit", name: "Edit Customer", Component: CustomerEdit },
  { path: "/app/order/add/select-customer/:customerId/shipping-info", name: "Edit Customer", Component: CustomerShipingInfo },
  { path: "/app/order/:orderId", name: "Order Details", Component: Order },
  { path: "/app/order/:orderId/update-purchasing-info", name: "Update Purchasing Information", Component: OrderPurchasingForm },
  { path: "/app/order/:orderId/update-selling-info", name: "Update Selling Information", Component: OrderSellingForm },
  { path: "/app/order/:orderId/update-purchasing-info/select-product", name: "Select Product", Component: ProductList },
  { path: "/app/order/:orderId/update-purchasing-info/select-product/add", name: "Add Product", Component: ProductAdd },
  { path: "/app/order/:orderId/update-purchasing-info/select-product/:productId", name: "Product Details", Component: ProductInfo },
  { path: "/app/order/:orderId/update-purchasing-info/select-product/:productId/edit", name: "Edit Product", Component: ProductEdit },
  { path: "/app/order/:orderId/update-selling-info/select-customer", name: "Select Customer", Component: CustomerList },
  { path: "/app/order/:orderId/update-selling-info/select-customer/add", name: "Add Customer", Component: CustomerAdd },
  { path: "/app/order/:orderId/update-selling-info/select-customer/:customerId", name: "Customer Details", Component: CustomerInfo },
  { path: "/app/order/:orderId/update-selling-info/select-customer/:customerId/edit", name: "Edit Customer", Component: CustomerEdit },
  { path: "/app/order/:orderId/update-selling-info/select-customer/:customerId/shipping-info", name: "Edit Customer", Component: CustomerShipingInfo }
];

export default routes;