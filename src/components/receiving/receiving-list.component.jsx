import React from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, useHistory, Link } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import ReceivingSearchForm from './receiving-search-form.component';
import ReceivingListTable from './receiving-list-table.component';
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
const ReceivingList = () => {

  const history = useHistory();
  const location = useLocation();

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
    <Card width="col" title="Search For Tracking Numbers" >
      <Ul>
        <ReceivingSearchForm
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
                ( + ) Scan Tracking Numbers
              </Link>
            </div>
          </div>
        </Li>
      </Ul>
    </Card>
    
    <ReceivingListTable
      queryStr={location.search}
    />
  </>
}

export default ReceivingList;