import React from 'react';

// dependencies
import { Link } from 'react-router-dom';
// firebase
import { auth } from '../../firebase/firebase.utils';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../state/user/user.selectors';

const NavbarUser = ({ 
  currentUser
}) => {

  const handleLogOut = e => {
    e.preventDefault();
    auth.signOut();
  }

  return <>
    {
      currentUser 
      ? <div className="btn-group text-light mx-md-2">
          <div className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fas fa-user fa-lg"></i>
          </div>
          <div className="dropdown-menu dropdown-menu-right">
            <div className="dropdown-header text-uppercase">{currentUser.displayName}</div>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item dropdown-item-cs" type="button" onClick={handleLogOut}>Log Out</button>
          </div>
        </div>
      : <Link to="/signin" className="text-light mx-md-2"><i className="far fa-user fa-lg"></i></Link>            
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(NavbarUser);