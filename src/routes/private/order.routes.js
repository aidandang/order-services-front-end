import OrderList from '../../components/order/order-list.component';
import OrderAdd from '../../components/order/order-add.component';
import OrderInfo from '../../components/order/order-info.component';
import OrderMerchantForm from '../../components/order/order-merchant-form.component';
import OrderItemForm from '../../components/order/order-item-form.component';
import OrderCost from '../../components/order/order-cost.component';
import ProductList from '../../components/product/product-list.component';
import ProductInfo from '../../components/product/product-info.component';
import ProductEdit from '../../components/product/product-edit.component';
import ProductAdd from '../../components/product/product-add.component';
import OrderReceivingForm from '../../components/order/order-receiving-form.component';
import CustomerList from '../../components/customer/customer-list.component';
import CustomerInfo from '../../components/customer/customer-info.component';
import CustomerEdit from '../../components/customer/customer-edit.component';
import CustomerAdd from '../../components/customer/customer-add.component';
import CustomerShipingInfo from '../../components/customer/customer-shipping-info.component';
import OrderSaleForm from '../../components/order/order-sale-form.component';

const routes = [
  { path: "/app/order", name: "Search for Order", Component: OrderList },
  { path: "/app/order/add", name: "Add Order", Component: OrderAdd },
  { path: "/app/order/add/select-customer", name: "Select Customer", Component: CustomerList },
  { path: "/app/order/add/select-customer/add", name: "Add Customer", Component: CustomerAdd },
  { path: "/app/order/add/select-customer/:customerId", name: "Customer Details", Component: CustomerInfo },
  { path: "/app/order/add/select-customer/:customerId/edit", name: "Edit Customer", Component: CustomerEdit },
  { path: "/app/order/add/select-customer/:customerId/shipping-info", name: "Edit Customer", Component: CustomerShipingInfo },
  { path: "/app/order/:orderId", name: "Order Details", Component: OrderInfo },
  { path: "/app/order/:orderId/update-order-merchant", name: "Update Order's Merchant", Component: OrderMerchantForm },
  { path: "/app/order/:orderId/update-order-item", name: "Update Order's Item", Component: OrderItemForm },
  { path: "/app/order/:orderId/update-order-item/select-product", name: "Select Product", Component: ProductList },
  { path: "/app/order/:orderId/update-order-item/select-product/add", name: "Add Product", Component: ProductAdd },
  { path: "/app/order/:orderId/update-order-item/select-product/:productId", name: "Product Details", Component: ProductInfo },
  { path: "/app/order/:orderId/update-order-item/select-product/:productId/edit", name: "Edit Product", Component: ProductEdit },
  { path: "/app/order/:orderId/update-order-cost", name: "Update Order's Cost", Component: OrderCost },
  { path: "/app/order/:orderId/update-order-receiving", name: "Update Order's Receiving", Component: OrderReceivingForm },
  { path: "/app/order/:orderId/select-customer", name: "Select Customer", Component: CustomerList },
  { path: "/app/order/:orderId/select-customer/add", name: "Add Customer", Component: CustomerAdd },
  { path: "/app/order/:orderId/select-customer/:customerId", name: "Customer Details", Component: CustomerInfo },
  { path: "/app/order/:orderId/select-customer/:customerId/edit", name: "Edit Customer", Component: CustomerEdit },
  { path: "/app/order/:orderId/select-customer/:customerId/shipping-info", name: "Edit Customer", Component: CustomerShipingInfo },
  { path: "/app/order/:orderId/update-sale-price", name: "Update Sale Price", Component: OrderSaleForm }
];

export default routes;