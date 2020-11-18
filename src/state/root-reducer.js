import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import sidebarReducer from './sidebar/sidebar.reducer';
import navbarReducer from './navbar/navbar.reducer';
import productReducer from './product/product.reducer';
import brandReducer from './brand/brand.reducer';
import customerReducer from './customer/customer.reducer';
import orderReducer from './order/order.reducer';
import alertReducer from './alert/alert.reducer';
import isFetchingReducer from './is-fetching/is-fetching.reducer';
import apiReducer from './api/api.reducer';
import merchantReducer from './merchant/merchant.reducer';
import warehouseReducer from './warehouse/warehouse.reducer';

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
  api: apiReducer,
  merchant: merchantReducer,
  warehouse: warehouseReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer)