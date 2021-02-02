import React, { useEffect } from 'react'

// components
import { TableFrame } from '../tag/tag.comp'
import { integerMask } from '../utils/helpers'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectOrderData } from '../../state/order/order.selectors'
import { getReq } from '../../state/api/api.requests'
import { OrderActionTypes } from '../../state/order/order.types'
// const
const component = 'receiving-process'

const ReceivingProcess = ({
  setFormData,
  data,
  getReq
}) => {

  const { allIds } = data

  const handleOnChange = (e, orderId) => {
    if (e.target.checked === true) {
      setFormData(prevState => ({
        ...prevState,
        [e.target.id]: orderId
      }))
    } else {
      setFormData(prevState => ({
        ...prevState,
        [e.target.id]: null
      }))
    }
  }

  useEffect(() => {
    const pathname = '/orders/receiving'
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS
    getReq(pathname, fetchSuccess, null, null, component)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <TableFrame>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Order#</th>
            <th scope="col">Item Description</th>
            <th scope="col" className="text-right">Qty</th>
          </tr>
        </thead>
          {
            allIds && allIds.reduce((a, c) => c.status === 'ordered' ? a + 1 : a, 0) > 0 
            ? allIds.map(order => <tbody key={order._id}>
                <tr 
                  key={order._id}
                  className="table-row-cs"
                  onClick={e => {
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                >
                  <td colSpan="3">{order.orderNumber}</td>
                </tr>
                {
                  order.items.map(item => <tr key={item._id}>
                      <td>
                        <div className="form-group form-check">
                          <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id={item._id}
                            onChange={e => {
                              e.stopPropagation()
                              handleOnChange(e, order._id)
                            }} 
                          />
                        </div>
                      </td>
                      <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                      <td className="text-right">{integerMask(item.qty.toString())}</td>
                    </tr>
                  )
                }
              </tbody>
            )
            : <>
              <tbody>
                <tr className="table-row-no-link-cs">
                  <td colSpan="3">No orders needed to process.</td>
                </tr>
              </tbody>
              
            </>
          }
      </table>
    </TableFrame>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})
const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr, setSuccess, component) => dispatch(
    getReq(pathname, fetchSuccess, queryStr, setSuccess, component)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceivingProcess)