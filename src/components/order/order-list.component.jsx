import React from 'react';

// components
import * as Yup from "yup";
import { useLocation, useHistory, Link } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import OrderSearchForm from './order-search-form.component';
import OrderListTable from './order-list-table.component';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';

// initial values
const formSchema = Yup.object().shape({
  search: Yup
    .string()
});
const formState = {
  search: ''
}

// main component
const OrderList = () => {

  const location = useLocation();
  const history = useHistory();

  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  const formSubmit = (e) => {
    e.preventDefault();
    
    let queryStr = convertSearchFormToQueryString(e, formData);

    if (queryStr !== undefined) {
      history.push(`${location.pathname}${queryStr}`)
    }
  }
  
  return <>
    <Card width="col" title="Search For Orders" >
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
                to={`${location.pathname}/add`}
                className="a-link-cs"
              >
                ( + ) Add a New Order
              </Link>
            </div>
          </div>
        </Li>
      </Ul>
    </Card>
    
    <OrderListTable
      queryStr={location.search}
    />
  </>
}

export default OrderList;