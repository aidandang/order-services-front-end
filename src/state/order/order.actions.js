import { OrderActionTypes } from './order.types';

export const updateItemInOrder = order => ({
  type: OrderActionTypes.UPDATE_ITEM_IN_ORDER,
  payload: order
})