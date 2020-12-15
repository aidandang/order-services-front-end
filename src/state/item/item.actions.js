import { ItemActionTypes } from './item.types'

export const addItemToList = item => ({
  type: ItemActionTypes.ITEM_ADD_TO_LIST,
  payload: item
})

export const removeItemInList = index => ({
  type: ItemActionTypes.ITEM_REMOVE_IN_LIST,
  payload: index
})

export const emptyItemList = () => ({
  type: ItemActionTypes.ITEM_EMPTY_LIST
})

export const copyItemToEdit = item => ({
  type: ItemActionTypes.COPY_ITEM_TO_EDIT,
  payload: item
})

export const copyItemsToList = items => ({
  type: ItemActionTypes.COPY_ITEMS_TO_LIST,
  payload: items
})