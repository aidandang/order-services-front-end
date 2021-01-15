import React, { useState, useEffect } from 'react'

// dependencies
import { useLocation, useHistory, useParams } from 'react-router-dom'
// components
import { Card, Ul, CompFrame } from '../tag/tag.comp'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { integerMask } from '../utils/helpers'
import AlertMesg from '../alert-mesg/alert-mesg.component'
import ReceivedCheckForm from './received-check-form.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryData } from '../../state/inventory/inventory.selectors'
import { updateRecvItems } from '../../state/inventory/inventory.actions'
import { patchReq } from '../../state/api/api.requests'
import { InventoryActionTypes } from '../../state/inventory/inventory.types'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
// constants
const component = 'receiving-check'

const ReceivedCheck = ({
  data,
  patchReq,
  updateRecvItems,
  alertMessage
}) => {

  const params = useParams()
  const location = useLocation()
  const history = useHistory()

  const tracking = data.trackings.find(el => el._id === params.trackingId)

  // set state to add, edit or remove an item of the tracking
  const [itemEdit, setItemEdit ] = useState({
    index: null
  })

  // set state if patch request to update the tracking is success
  // redirect to ReceivedTrackings comp if yes
  const [success, setSuccess] = useState(false)

  // get previous path for going back then go back if success
  const prevPath = location.pathname.split('/check')[0]

  const handleItemEdit = (item, index) => {
    const obj = { ...item }
    obj.qty = item.qty === 0 ? '' : integerMask(item.qty.toString())
    obj.index = index
  
    setItemEdit(prevState => ({
      ...prevState, ...obj
    }))
  }

  const handleRemoveItem = (e, index) => {
    e.stopPropagation()

    var items = [ ...tracking.recvItems ]

    items.splice(index, 1)
    updateRecvItems(items, tracking._id)
    
    closeComp()
  }

  const formSubmit = () => {
    const pathname = `/inventory/receiving/check/${tracking._id}`
    const fetchSuccess = InventoryActionTypes.INVENTORY_FETCH_SUCCESS
    const reqBody = {
      status: 'checked',
      recvItems: [ ...tracking.recvItems ],
      chkdDate: Date.now()
    }

    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  }

  const formReset = () => {
    history.push(prevPath)
  }

  const closeComp = () => {
    setItemEdit({
      index: null
    })
  }

  useEffect(() => {
    if (success) history.push(prevPath, 'reload')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return <>

    { alertMessage && alertMessage.component === component && <AlertMesg /> }
    
    <div className="row">
      <div className="col-xl-8"> 
        <div className="row mb-2">
          <div className="col">
            <div className="table-responsive-sm">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Tracking</th>
                    <th scope="col">Item Description</th>
                    <th scope="col" className="text-right">Qty</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-row-no-link-cs">
                    <th scope="col" colSpan="4">
                      {tracking.tracking}
                    </th>
                  </tr>
                  {
                    tracking.recvItems.map((item, index) => 
                      <tr 
                        key={index} 
                        className={itemEdit.index === index ? "table-row-no-link-cs" : "table-row-cs"}
                        onClick={e => {
                          e.preventDefault()
                          if (itemEdit.index !== index) handleItemEdit(item, index)
                        }} 
                      >
                        {
                          itemEdit.index === index
                          ? <>
                            <td colSpan="4">
                              <CompFrame closeComp={closeComp}>
                                <ReceivedCheckForm tracking={tracking} itemEdit={itemEdit} closeComp={closeComp} />
                              </CompFrame>
                            </td>
                          </>
                          : <>
                            <td></td>
                            <td>{item.desc}</td>
                            <td className="text-right">{integerMask(item.qty.toString())}</td>
                            <td
                              onClick={e => handleRemoveItem(e, index)}
                              className="text-right"
                            >
                              <i className="fas fa-minus-circle text-danger"></i>
                            </td>
                          </>
                        }
                      </tr>
                    )
                  }
                  <tr className="table-row-cs">
                    {
                      itemEdit.index === 'add'
                      ? <>
                        <td colSpan="4">
                          <CompFrame closeComp={closeComp}>
                            <ReceivedCheckForm tracking={tracking} closeComp={closeComp} />
                          </CompFrame>
                        </td>
                      </>
                      : <>
                        <td colSpan="4">
                            <a
                            href="/"
                            className="a-link-cs"
                            onClick={e => {
                              e.preventDefault()
                              setItemEdit({
                                index: 'add'
                              })
                            }}
                          >
                            Add Item
                          </a>
                        </td>
                      </>
                    }
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <Card title="Update Checking">
          <Ul>
            <SubmitOrReset
              buttonName={'Check'}
              buttonDisabled={tracking.recvItems.length > 0 ? false : true}
              formSubmit={formSubmit}
              formReset={formReset}
              secondButtonName={'Cancel'}
            />
          </Ul>
        </Card>
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectInventoryData,
  alertMessage: selectAlertMessage
})
const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  ),
  updateRecvItems: (items, id) => dispatch(updateRecvItems(items, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedCheck)