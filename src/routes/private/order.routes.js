import Order from '../../components/order/order.comp'
import OrderList from '../../components/order/order-list.comp'
import OrderAdd from '../../components/order/order-add.comp'
import PurchasingUpdate from '../../components/order/purchasing-update.comp'
import SellingUpdate from '../../components/order/selling-update.comp'

const routes = [
  { path: "/app/order", name: "Search for Order", Component: OrderList },
  { path: "/app/order/add", name: "Add Order", Component: OrderAdd },
  { path: "/app/order/:orderId", name: "Order Details", Component: Order },
  { path: "/app/order/:orderId/purchasing-update", name: "Purchasing Update", Component: PurchasingUpdate },
  { path: "/app/order/:orderId/selling-update", name: "Selling Update", Component: SellingUpdate }
]

export default routes