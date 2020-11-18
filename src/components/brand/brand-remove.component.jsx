import React, { useEffect, useState } from 'react';

// components
import { Li, Button } from '../tag/tag.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { deleteReq } from '../../state/api/api.requests';
import { BrandActionTypes } from '../../state/brand/brand.types';

const BrandRemove = ({
  brand,
  deleteReq,
  alertMessage,
  setAction
}) => {

  const [success, setSuccess] = useState(false);

  const formSubmit = () => {

    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS;
    deleteReq(`/brands/${brand._id}`, fetchSuccess, setSuccess, 'brand-remove');
  }

  useEffect(() => {
    if (success) setAction('')
    // eslint-disable-next-line
  }, [success])

  // main component
  return <>

    { alertMessage && alertMessage.component === 'brand-remove' && <AlertMesg/> }

    <form>
      <Li>
        <div className="row">
          <div className="col text-right">
            <a
              href="/"
              className="a-link-cs"
              onClick={e => {
                e.preventDefault();
                setAction('')
              }}
            >
              Cancel
            </a>
          </div>  
        </div>
      </Li>
    </form>
    <form>
      <Li>
        <span>Do you want to remove?</span>
      </Li>
    </form>
    <Li>
      <div className="row">
        <div className="col my-3">
          <Button 
            onClick={e => {
              e.preventDefault();
              formSubmit();
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </Li> 
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  deleteReq: (
    pathname, 
    fetchSuccess, 
    setSuccess, 
    component
  ) => dispatch(deleteReq(
    pathname, 
    fetchSuccess, 
    setSuccess, 
    component
  ))
})

export default connect(mapStateToProps, mapDispatchToProps)(BrandRemove);