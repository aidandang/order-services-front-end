import React from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, useHistory, Link } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import ProductSearchForm from './product-search-form.component';
import ProductCards from './product-cards.component';
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
const ProductList = () => {

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
    <Card width="col" title="Search For Products" >
      <Ul>
        <ProductSearchForm 
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
                ( + ) Add a New Product
              </Link>
            </div>
          </div>
        </Li>
      </Ul>
    </Card>
    
    <ProductCards
      queryStr={location.search}
    />
  </>
}

export default ProductList;