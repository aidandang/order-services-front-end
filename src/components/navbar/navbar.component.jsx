import React from 'react';

// dependencies
import { Link } from 'react-router-dom';

// components
import NavbarItems from './navbar-items.component';
import NavbarUser from './navbar-user.component';

// assets
import logo from '../../assets/logo.svg';

// ui settings
import './navbar.styles.css';
const NavbarBackgroundClassName = {
  DEFAULT: 'nav-background',
  LANDING: 'nav-background-landing'
}

const Navbar = ({ 
  currentRoute
}) => {
  return <>
    <nav 
      className={`sticky-top ${currentRoute !== 'landing' ? NavbarBackgroundClassName.DEFAULT : NavbarBackgroundClassName.LANDING}`}
    >
      <div className="row p-0 m-0 align-items-center py-3">
        <div className="col-2 text-center d-md-none">
          <a 
            className="text-light" 
            data-toggle="collapse" 
            href="#multiCollapse" 
            role="button" 
            aria-expanded="false" 
            aria-controls="multiCollapse"
          >
            <i className="fas fa-bars fa-lg"></i>
          </a>
        </div>
        <div className="col-8 text-center d-md-none">
          <Link to="/"><img src={logo} width="32" alt="logo" /></Link>
        </div>
        <div className="col-2 col-md-12 text-center">
          <div className="row align-items-center">
            <div className="col d-none d-md-block text-md-left ml-2">
              {
                currentRoute !== 'private' && <> 
                  <span className="text-light mr-4"><Link to="/"><img src={logo} width="32" alt="logo" /></Link></span>
                  <NavbarItems />
                </>
              }
            </div>
            <div className="col text-md-right">
              <NavbarUser />
            </div>
          </div>
        </div>
      </div>

      {/* start of collapse navigation */}
      <div className="row p-0 m-0 collapse multi-collapse d-md-none" id="multiCollapse">
        <div className="col-12 py-2">
          <div className="row">
            <div className="col-2 text-center">
            </div>
            <div className="col-10 text-left text-light text-uppercase">
              Menu
            </div>
          </div>
        </div>
        <div className="col-12 py-2">
          <div className="row">
            <div className="col-2 text-center">
            </div>
            <div className="col-10 text-left text-light text-uppercase">
              {null}
            </div>
          </div>
        </div>
      </div>
      {/* end of collapse navigation */}
      
    </nav>
  </>
}

export default Navbar;