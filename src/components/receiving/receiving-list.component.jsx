import React from 'react';

// dependencies
import { useLocation, useHistory, Link } from 'react-router-dom';
import queryString from 'query-string';

// components
import { Card, Ul, Li } from '../tag/tag.component';
import ReceivingSearchForm from './receiving-search-form.component';
import ReceivingListTable from './receiving-list-table.component';

// main component
const ReceivingList = () => {

  const history = useHistory();
  const location = useLocation();

  const formSubmit = (key, value) => {
    let queryStr = undefined;

    if (value.length > 0 ) {
      if (key.length > 0) {
        queryStr = '?' + queryString.stringify({ [key]: value });
      }
    } else if (value === '') {
      queryStr = '';
    }

    if (queryStr !== undefined) {
      history.push(`${location.pathname}${queryStr}`)
    }
  }

  return <>
    <Card width="col" title="Search For Tracking Numbers" >
      <Ul>
        <ReceivingSearchForm
          formSubmit={formSubmit}
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