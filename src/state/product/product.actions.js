import { ProductActionTypes } from './product.types';

export const copyProductToById = product => ({
  type: ProductActionTypes.PRODUCT_COPY_TO_BY_ID,
  payload: product
})

export const setProductComp = (comp) => ({
  type: ProductActionTypes.SET_PRODUCT_COMPONENT,
  payload: comp
})
