import { InventoryActionTypes } from './inventory.types'

export const updateCheckedItems = (items) => ({
  type: InventoryActionTypes.INVENTORY_UPDATE_CHECKED_ITEMS,
  payload: items
})