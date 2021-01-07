import Order from '../../components/order/order.comp'
import OrderList from '../../components/order/order-list.component'
import OrderAdd from '../../components/order/order-add.component'
import PurchasingUpdate from '../../components/order/purchasing-update.comp'
import OrderPurchasingUpdate from '../../components/order/order-purchasing-update.component'
import OrderPurchasingForm from '../../components/order/order-purchasing-form.component'
import OrderItemForm from '../../components/order/order-item-form.component'
import OrderSellingUpdate from '../../components/order/order-selling-update.component';
import OrderSellingForm from '../../components/order/order-selling-form.component';
import ProductList from '../../components/product/product-list.component';
import ProductInfo from '../../components/product/product-info.component';
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
  { path: "/app/order/:orderId/update-purchasing-order", name: "Update Purchasing Order", Component: OrderPurchasingUpdate },
  { path: "/app/order/:orderId/purchasing-update", name: "Purchasing Update", Component: PurchasingUpdate },
  { path: "/app/order/:orderId/update-purchasing-order/info", name: "Update Purchasing Information", Component: OrderPurchasingForm },
  { path: "/app/order/:orderId/update-purchasing-order/item", name: "Update Item", Component: OrderItemForm },
  { path: "/app/order/:orderId/update-purchasing-order/item/select-product", name: "Select Product", Component: ProductList },
  { path: "/app/order/:orderId/update-purchasing-order/item/select-product/add", name: "Add Product", Component: ProductAdd },
  { path: "/app/order/:orderId/update-purchasing-order/item/select-product/:productId", name: "Product Details", Component: ProductInfo },
  { path: "/app/order/:orderId/update-selling-order", name: "Update Selling Order", Component: OrderSellingUpdate },
  { path: "/app/order/:orderId/update-selling-order/price", name: "Update Selling Price", Component: OrderSellingForm },
  { path: "/app/order/:orderId/update-selling-order/select-customer", name: "Select Customer", Component: CustomerList },
  { path: "/app/order/:orderId/update-selling-order/select-customer/add", name: "Add Customer", Component: CustomerAdd },
  { path: "/app/order/:orderId/update-selling-order/select-customer/:customerId", name: "Customer Details", Component: CustomerInfo },
  { path: "/app/order/:orderId/update-selling-order/select-customer/:customerId/edit", name: "Edit Customer", Component: CustomerEdit },
  { path: "/app/order/:orderId/update-selling-order/select-customer/:customerId/shipping-info", name: "Edit Customer", Component: CustomerShipingInfo }
];

export default routes;