import { OrderActionTypes } from './order.types';

export const copyOrderToEdit = order => ({
  type: OrderActionTypes.COPY_ORDER_TO_EDIT,
  payload: order
})

export const updateItemInOrder = order => ({
  type: OrderActionTypes.UPDATE_ITEM_IN_ORDER,
  payload: order
})

export const updatePurchasingInOrder = purchasing => ({
  type: OrderActionTypes.UPDATE_PURCHASING_IN_ORDER,
  payload: purchasing
})

export const updateCustomerInOrder = customer => ({
  type: OrderActionTypes.UPDATE_CUSTOMER_IN_ORDER,
  payload: customer
})

export const setItemTempToEdit = itemTemp => ({
  type: OrderActionTypes.SET_ITEM_TEMP_TO_EDIT,
  payload: itemTemp
})

export const selectProductToOrderItem = payload => ({
  type: OrderActionTypes.SELECT_PRODUCT_TO_ORDER_ITEM,
  payload
})

export const setPurcItemTabActive = payload => ({
  type: OrderActionTypes.SET_PURC_ITEM_TAB_ACTIVE,
  payload
})