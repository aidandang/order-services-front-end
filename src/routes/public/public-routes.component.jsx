import React from 'react';

// dependencies
import { Switch, Route, Redirect } from 'react-router-dom';
// components
import Navbar from '../../components/navbar/navbar.component';
import Footer from '../../components/footer/footer.component';
import LandingPage from '../../pages/landing-page/landing-page.component';
import PageNotFound from '../../pages/page-not-found/page-not-found.component';
import SignUpPage from '../../pages/sign-up-page/sign-up-page.component';
import SignInPage from '../../pages/sign-in-page/sign-in-page.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../state/user/user.selectors';
// ui settings
import './public-routes.styles.css';
const bgImage = 'https://firebasestorage.googleapis.com/v0/b/order-services-media.appspot.com/o/landing-page%2Fcover-logistics-01.jpg?alt=media&token=0b141ceb-510d-4b8c-bf51-1cd1bffb48ea';

const PublicRoutes = ({ 
  match, currentUser 
}) => {
  let currentRoute = 'public';
  const backgroundStyles = {
    style: {}
  };
  
  // isExact equals true if the route is '/', which is landing page.
  if (match.isExact) {
    currentRoute = 'landing';
    backgroundStyles.style.backgroundImage = `url(${bgImage})`;
    backgroundStyles.class = 'row m-0 p-0 public-main-wrapper landing-bg';
  } else {
    backgroundStyles.class = 'row m-0 p-0 public-main-wrapper';
  }

  return <>
    <div className="container-fluild">
      <div className={backgroundStyles.class} style={backgroundStyles.style}>
        <div className="col-12 p-0 m-0">
          <header>
            <Navbar currentRoute={currentRoute} />
          </header>
          <main>
            <div className="row p-0 m-0 px-2 pt-4 pb-5">
              <div className="col">
                <Switch>
                  <Route exact path="/signup" render={() => currentUser ? <Redirect to='/' /> : <SignUpPage />} />
                  <Route exact path="/signin" render={() => currentUser ? <Redirect to='/' /> : <SignInPage />} />
                  <Route exact path="/" render={() => <LandingPage />} />
                  <Route path="/" render={() => <PageNotFound />} />
                </Switch>
              </div>
            </div>
          </main>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(PublicRoutes);