import React, { useEffect, useState } from 'react';

// components
import { Ul, Li, Button } from '../tag/tag.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/api.requests';
import { ProductActionTypes } from '../../state/product/product.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';


const ProductColorRemove = ({
  patchReq,
  data,
  colorTemp,
  setAction,
  alertMessage
}) => {

  const { byId } = data;

  const [success, setSuccess] = useState(false);

  const formSubmit = e => {
    e.preventDefault();

    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;

    const productTemp = { 
      ...byId,
      colors: byId.colors.filter(color => color._id !== colorTemp._id)
    }
    patchReq('/products/' + byId._id, fetchSuccess, productTemp, setSuccess, 'product-color-remove');
  }

  useEffect(() => {
    if (success) setAction('')
    // eslint-disable-next-line
  }, [success])

  return <>

    { alertMessage && alertMessage.component === 'product-color-remove' && <AlertMesg/> }

    <form onSubmit={formSubmit}>
      <Ul>

        <Li>
          <span>Do you want to remove?</span>
        </Li>

        <Li>
          <div className="row">
            <div className="col my-3">
              <Button 
                type="submit"
              >
                Remove
              </Button>
              <span className="mr-3"></span>
              <Button
                onClick={e => {
                  e.preventDefault();
                  setAction('')
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Li>

      </Ul>
    </form>
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  patchReq: (
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    component
  ) => dispatch(patchReq(
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    component
  ))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductColorRemove);