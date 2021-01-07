import React, { useState, useEffect } from 'react'

// dependencies
import { useLocation, useHistory, useParams } from 'react-router-dom'
// components
import { Card, Ul } from '../tag/tag.component'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import { integerMask } from '../utils/helpers'
import AlertMesg from '../alert-mesg/alert-mesg.component'
import ReceivedCheckForm from './received-check-form.comp'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryData} from '../../state/inventory/inventory.selectors'
import { patchReq } from '../../state/api/api.requests'
import { ReceivingActionTypes } from '../../state/receiving/receiving.types'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
// constants
const component = 'receiving-check'

const ReceivedCheck = ({
  data,
  patchReq,
  alertMessage
}) => {

  const params = useParams()
  const location = useLocation()
  const history = useHistory()

  // get trackingId from url then find the tracking obj
  const { trackingId } = params
  const { trackings } = data
  const tracking = trackings.find(el => el._id === trackingId)

  // set state to add, edit or remove an item of the tracking
  const [itemEdit, setItemEdit ] = useState({
    index: null
  })

  // set state if patch request to update the tracking is success
  // redirect to ReceivedTrackings comp if yes
  const [success, setSuccess] = useState(false)

  // get previous path for going back then go back if success
  const prevPath = location.pathname.split(`/${trackingId}`)[0]

  const handleItemEdit = (item, index) => {
    const obj = { ...item }
    obj.qty = item.qty === 0 ? '' : integerMask(item.qty.toString())
    obj.index = index
  
    setItemEdit(prevState => ({
      ...prevState, ...obj
    }))
  }

  const formSubmit = () => {
    const pathname = `/receiving/${tracking._id}`
    const fetchSuccess = ReceivingActionTypes.RECEIVING_FETCH_SUCCESS
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

  useEffect(() => {
    if (success) history.push(prevPath)
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="col" colSpan="3">
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
                            <td colSpan="3">
                              <div className="row mb-2">
                                <div className="col text-right">
                                  <a
                                    href="/"
                                    className="a-link-cs"
                                    onClick={e => {
                                      e.preventDefault();
                                      setItemEdit({
                                        index: null
                                      })
                                    }}
                                  >
                                    Cancel
                                  </a>
                                </div>  
                              </div>
                              <ReceivedCheckForm itemEdit={itemEdit} setItemEdit={setItemEdit} />
                            </td>
                          </>
                          : <>
                            <td></td>
                            <td>{item.desc}</td>
                            <td className="text-right">{integerMask(item.qty.toString())}</td>
                          </>
                        }
                      </tr>
                    )
                  }
                  <tr className="table-row-cs">
                    {
                      itemEdit.index === 'add'
                      ? <>
                        <td colSpan="3">
                          <div className="row mb-2">
                            <div className="col text-right">
                              <a
                                href="/"
                                className="a-link-cs"
                                onClick={e => {
                                  e.preventDefault();
                                  setItemEdit({
                                    index: null
                                  })
                                }}
                              >
                                Cancel
                              </a>
                            </div>  
                          </div>
                          <ReceivedCheckForm setItemEdit={setItemEdit} />
                        </td>
                      </>
                      : <>
                        <td colSpan="3">
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
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedCheck)