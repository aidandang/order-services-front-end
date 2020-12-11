import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer'
import sidebarReducer from './sidebar/sidebar.reducer'
import navbarReducer from './navbar/navbar.reducer'
import productReducer from './product/product.reducer'
import brandReducer from './brand/brand.reducer'
import customerReducer from './customer/customer.reducer'
import orderReducer from './order/order.reducer'
import alertReducer from './alert/alert.reducer'
import isFetchingReducer from './is-fetching/is-fetching.reducer'
import merchantReducer from './merchant/merchant.reducer'
import warehouseReducer from './warehouse/warehouse.reducer'
import receivingReducer from './receiving/receiving.reducer'
import inventoryReducer from './inventory/inventory.reducer'
import shippingReducer from './shipping/shipping.reducer'
import consigneeReducer from './consignee/consignee.reducer'
import courierReducer from './courier/courier.reducer'
import itemReducer from './item/item.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['']
}

const appReducer = combineReducers({
  alert: alertReducer,
  user: userReducer,
  sidebar: sidebarReducer,
  navbar: navbarReducer,
  product: productReducer,
  brand: brandReducer,
  customer: customerReducer,
  isFetching: isFetchingReducer,
  order: orderReducer,
  merchant: merchantReducer,
  warehouse: warehouseReducer,
  receiving: receivingReducer,
  inventory: inventoryReducer,
  shipping: shippingReducer,
  consignee: consigneeReducer,
  courier: courierReducer,
  item: itemReducer
})

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default persistReducer(persistConfig, rootReducer)