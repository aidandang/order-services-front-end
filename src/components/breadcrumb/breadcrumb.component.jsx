import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ routes, message, ...props }) => {

  const crumbs = routes
    .filter(({ path }) => props.match.path.includes(path))
    .map(({ path, ...rest }) => ({
      path: Object.keys(props.match.params).length
        ? Object.keys(props.match.params).reduce(
            (path, param) =>
              path.replace(`:${param}`, props.match.params[param]),
            path
          )
        : path,
      ...rest
    }));

  return <>
    <div className="row mb-4">
      <div className="col">
        <hr className="my-0" />
        <div className="row mx-0 mt-2 px-1">
          <div className="col">
            {
              crumbs.length <= 1 
              ? <small className="text-muted">{message}</small>
              : <>
                {
                  crumbs.map(({ path, name }, index) => 
                    <small key={index} className={`text-muted ${index === (crumbs.length - 1) ? null : 'mr-2'}`}>
                      {
                        index === (crumbs.length - 1) 
                        ? <>{name}</>
                        : <>
                          <Link to={path} className="a-link-cs">
                            {name}
                          </Link>
                        </>
                      }
                    </small>
                  )
                }
              </>
            }       
          </div>
        </div>
      </div>
    </div>
  </>
};

export default Breadcrumbs;