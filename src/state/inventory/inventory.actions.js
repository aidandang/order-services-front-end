import { InventoryActionTypes } from './inventory.types'

export const updateRecvItems = (items, trackingId) => ({
  type: InventoryActionTypes.INVENTORY_UPDATE_RECV_ITEMS,
  payload: {
    items,
    trackingId
  }
})

export const matchItems = (values) => ({
  type: InventoryActionTypes.INVENTORY_MATCH_ITEMS,
  payload: values
})