import React, { useState, useEffect } from 'react'

// dependecies
import moment from 'moment'
import * as Yup from "yup"
import { Link } from 'react-router-dom'
// component
import { Card, Ul, Li, TextInput, TableFrame } from '../tag/tag.comp'
import { useForm } from '../hook/use-form'
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component'
import AlertMesg from '../alert-mesg/alert-mesg.component'
// redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectAlertMessage } from '../../state/alert/alert.selectors'
import { postReq } from '../../state/api/api.requests'
import { ReceivingActionTypes } from '../../state/receiving/receiving.types'
import { addTrackingToList, removeTrackingInList, emptyList } from '../../state/receiving/receiving.actions'
import { selectReceivingList } from '../../state/receiving/receiving.selectors'
// constants
const formSchema = Yup.object().shape({
  tracking: Yup
    .string()
    .required(),
  note: Yup
    .string()
})
const formState = {
  tracking: "",
  note: ""
}

const WAREHOUSE = 1

// main component
const ReceivingForm = ({
  postReq,
  list,
  addTrackingToList,
  removeTrackingInList,
  emptyList,
  alertMessage
}) => {

  const [success, setSuccess] = useState(false)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema)

  const formSubmit = () => {
    const obj = {}
    obj.tracking = formData.tracking
    obj.receivedDate = Date.now()
    obj.warehouseNumber = WAREHOUSE

    addTrackingToList(obj)
    setValues(formState)
  }

  const formReset = () => {
    setValues(formState)
  }

  const handleRemoveTracking = (e, index) => {
    e.preventDefault()
    removeTrackingInList(index)
  }

  const handleUploadToTheSystem = () => {
    const fetchSuccess = ReceivingActionTypes.RECEIVING_FETCH_SUCCESS
    const reqBody = [...list]

    postReq('/receiving', fetchSuccess, reqBody, setSuccess, 'receiving-form')
  }

  useEffect(() => {
    if (success) emptyList()
    // eslint-disable-next-line
  }, [success])
  
  return <>

    { alertMessage && alertMessage.component === 'receiving-form' && <AlertMesg /> }

    <div className="row">
      <div className="col-xl-8">
        <TableFrame>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Tracking#</th>
                <th scope="col">Received Time</th>
                <th scope="col" className="text-right"></th>
              </tr>
            </thead>
            <tbody>
              {
                list.length > 0 
                ? <>
                  {list.map((item, index) => 
                    <tr 
                      key={index}
                      className="table-row-cs"
                    >
                      <th scope="row">{item.tracking}</th>
                      <td>{moment(item.recvDate).format('MMM Do YYYY, h:mm:ss a')}</td>
                      <td
                        onClick={e => handleRemoveTracking(e, index)}
                        className="text-right"
                      >
                        <i className="fas fa-minus-circle text-danger"></i>
                      </td>
                    </tr>
                  )}
                  <tr 
                    className="table-row-cs"
                  >
                    <th colSpan="3">
                      <Link 
                        to="/"
                        className="a-link-cs"
                        onClick={e => {
                          e.preventDefault()
                          handleUploadToTheSystem()
                        }}
                      >
                        Upload to the System
                      </Link>
                    </th>
                  </tr>
                </>
                : <>
                  <tr className="table-row-cs">
                    <td colSpan="3">No tracking number in the list.</td>
                  </tr>
                </>
              }
            </tbody>
          </table>
        </TableFrame>
      </div>
      <div className="col-xl-4">
        <Card width="col" title={'Scan Tracking Numbers'}>
          <Ul>  
            <Li>
              <TextInput
                label="Tracking (*)" 
                name="tracking"
                errors={errors}
                size="col"
                smallText="Input tracking numbers either by scanning or typing."
                value={formData.tracking}
                onChange={onInputChange} 
              />
            </Li>
            <Li>
              <TextInput
                label="Note" 
                name="note"
                errors={errors}
                size="col"
                smallText="Additional information about the tracking."
                value={formData.note}
                onChange={onInputChange} 
              />
            </Li>
            <SubmitOrReset 
              buttonName={'Update'}
              buttonDisabled={buttonDisabled}
              formSubmit={formSubmit}
              formReset={formReset}
            />
          </Ul>
        </Card>
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
  list: selectReceivingList
})

const mapDispatchToProps = dispatch => ({
  postReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  ),
  addTrackingToList: tracking => dispatch(addTrackingToList(tracking)),
  removeTrackingInList: index => dispatch(removeTrackingInList(index)),
  emptyList: () => dispatch(emptyList())
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceivingForm)