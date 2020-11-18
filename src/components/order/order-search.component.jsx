import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Link } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import OrderSearchForm from './order-search-form.component';
import PreviewOrders from './preview-orders.component';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderData } from '../../state/order/order.selectors';
import { getReq } from '../../state/api/api.requests';
import { OrderActionTypes } from '../../state/order/order.types';

// initial values
const formSchema = Yup.object().shape({
  search: Yup
    .string()
});

const formState = {
  search: ''
}

const OrderList = ({ 
  getReq, 
  data
}) => {
  
  const location = useLocation();

  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  const [active, setActive] = useState(null);
  
  // handle search form 
  const formSubmit = (e, page) => {
    e.preventDefault();

    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;
    
    let queryStr = convertSearchFormToQueryString(e, formData);

    if (queryStr !== undefined) {
      if (page) queryStr = queryStr + `${queryStr === '' ? '?' : '&'}page=${page}`;
      getReq('/orders', fetchSuccess, queryStr);
      setActive(page)
    }
  }
  
  return <>
    <Card width="col" title="Search for orders">
      <Ul>
        <OrderSearchForm
          formSubmit={formSubmit} 
          formData={formData}
          errors={errors}
          onInputChange={onInputChange}
          buttonDisabled={buttonDisabled}
        />

        <Li>
          <div className="row">
            <div className="col">
              <Link
                to={{
                  pathname: location.pathname,
                  search: location.search ? `${location.search}&ctnr=order-add` : `?ctnr=order-add`,
                  state: {
                    key: location.key,
                    path: location.pathname + location.search
                  }
                }}
                className="a-link-cs"
              >
                ( + ) Add a New Order
              </Link>
            </div>
          </div>
        </Li>
      </Ul>
    </Card>
    
    {
      data && data.allIds && data.allIds.length > 0 && data.info && <>
        <PaginationBar  
          numberOfPages={data.info.pages}
          limit={5}
          onPageChange={formSubmit}
          page={active}
        />
        <PreviewOrders />
        <PaginationBar 
          numberOfPages={data.info.pages}
          limit={10}
          onPageChange={formSubmit}
          page={active}
        /> 
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);