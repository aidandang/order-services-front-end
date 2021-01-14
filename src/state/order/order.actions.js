import { OrderActionTypes } from './order.types'

export const orderSetComp = comp => ({
  type: OrderActionTypes.ORDER_SET_COMP,
  payload: comp
})

export const updateItemInOrder = order => ({
  type: OrderActionTypes.UPDATE_ITEM_IN_ORDER,
  payload: order
})

export const updatePurchasingInOrder = purchasing => ({
  type: OrderActionTypes.UPDATE_PURCHASING_IN_ORDER,
  payload: purchasing
})

export const setItemTempToEdit = itemTemp => ({
  type: OrderActionTypes.SET_ITEM_TEMP_TO_EDIT,
  payload: itemTemp
})

export const selectProductToOrderItem = payload => ({
  type: OrderActionTypes.SELECT_PRODUCT_TO_ORDER_ITEM,
  payload
})

export const selectCustomerToOrder = payload => ({
  type: OrderActionTypes.SELECT_CUSTOMER_TO_ORDER,
  payload
})