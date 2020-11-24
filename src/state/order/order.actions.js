import { OrderActionTypes } from './order.types';

export const copyOrderItemToEdit = payload => ({
  type: OrderActionTypes.COPY_ORDER_ITEM_TO_EDIT,
  payload
})