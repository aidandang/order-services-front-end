import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';

// data
const MENU_ITEMS = [
  {
    id: 1,
    text: 'Application',
    link: '/app',
    icon: 'fas fa-briefcase'
  },
  {
    id: 2,
    text: 'Read Me',
    link: '/app',
    icon: 'fab fa-readme'
  }
]

const Menu = () => {

  const location = useLocation();

  return <>
    {
      MENU_ITEMS.map(item =>
        <span key={item.id} className="mr-3">
          {
            item.link === location.pathname 
            ? <span className="text-muted">{item.text}</span>
            : <Link to={item.link} className="navbar-link text-light">{item.text}</Link>
          }
        </span>
      )
    }
  </>
}

export default Menu;