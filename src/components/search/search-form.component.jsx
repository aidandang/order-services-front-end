import React, { useState } from 'react';

// dependencies
import { useLocation, Link } from 'react-router-dom';

// components
import { WhiteCard, Ul, Li, Button } from '../tag/tag.component'

const SearchForm = ({
  formSubmit,
  queryState,
  searchList,
  defaultFilter,
  addLink
}) => {

  const location = useLocation()

  const [filterBy, setFilterBy] = useState(defaultFilter);

  const [query, setQuery] = useState(queryState);

  const handleFilterBy = e => {
    e.preventDefault();
    setFilterBy(e.target.name)
  }

  const onInputChange = e => {
    e.persist();
    setQuery(prevState => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  } 

  return <>
    <WhiteCard width="col">
      <Ul>
        <Li>
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col d-flex flex-column flex-xl-row">
                  <div className="mr-xl-3">
                    {
                      Object.keys(searchList).map((el, index) => 
                        <div key={index} className="form-group my-2">
                          {
                            filterBy === el && <>
                              {
                                searchList[el].type === 'text-input' && <>
                                  <label htmlFor={el} className="sr-only">Tracking</label>
                                  <input 
                                    type="text"
                                    className="form-control" 
                                    name={el} 
                                    placeholder={searchList[el].placeholder}
                                    onChange={onInputChange}
                                    value={query[el]}
                                  />
                                </>
                              }
                              {
                                searchList[el].type === 'select-input' && <>
                                  <select
                                    name={el} 
                                    className="custom-select"
                                    onChange={onInputChange}
                                    value={query[el]}
                                  >
                                    <option value=''>All</option>
                                    {
                                      searchList[el].items.map((item, index) => 
                                        <option key={index} value={item.value}>{item.text}</option>
                                      )
                                    }
                                  </select>
                                </>
                              }
                              {
                                searchList[el].type === 'date-input' && <>
                                  <label htmlFor={el} className="sr-only">Received Date</label>
                                  <input
                                    className="form-control" 
                                    type="date"
                                    name={el}
                                    onChange={onInputChange}
                                    value={query[el]}
                                  />
                                </>
                              }
                            </>
                          }
                        </div>
                      )
                    }
                  </div>
                  <div className="dropdown my-2">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a 
                      className="btn btn-outline-primary btn-outline-cs dropdown-toggle" 
                      href="/" 
                      role="button" 
                      id="dropdownMenuLink" 
                      data-toggle="dropdown" 
                      aria-haspopup="true" 
                      aria-expanded="false"
                    >
                      {`Filter by: ${searchList[filterBy].placeholder}`}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      {
                        Object.keys(searchList).map((el, index) => 
                          /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
                          <a key={index} href="/" name={el} className="dropdown-item dropdown-item-cs" onClick={e => handleFilterBy(e)}>{searchList[el].placeholder}</a>
                        )
                      }
                    </div>
                  </div>
                  <div className="ml-xl-3 my-2">
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        formSubmit(filterBy, query[filterBy])
                      }}
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Li>
        
        {
          addLink &&
          <Li>
            <div className="row">
              <div className="col">
                <Link
                  to={`${location.pathname}/add`}
                  className="a-link-cs"
                >
                  {addLink.title}
                </Link>
              </div>
            </div>
          </Li>
        }
      
      </Ul>
    </WhiteCard>
    
  </>
}

export default SearchForm;