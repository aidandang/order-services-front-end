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