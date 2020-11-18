import React from 'react';

// components
import Title from '../../components/title/title.component';
import ForgotPassword from '../../components/forgot-password/forgot-password.component';
import Tabbar from '../../components/tabbar/tabbar.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectForgotPasswordTabbar } from '../../state/tabbar/tabbar.selectors';

// ui settings
import './forgot-password-page.styles.css';
const titleSettings = {
  title: 'Forgot Password?',
  button: undefined
}

// MAIN FUNCTION
const ForgotPasswordPage = ({ forgotPasswordTabbar }) => {

  const { selectedTab, list } = forgotPasswordTabbar;

  return <>
    <Title settings={titleSettings} />
    <Tabbar
      page='forgotPassword' 
      tabbarList={list} 
      selectedTab={selectedTab}
    />
    { selectedTab === 1 && <ForgotPassword /> }
  </>   
}

const mapStateToProps = createStructuredSelector({
  forgotPasswordTabbar: selectForgotPasswordTabbar
})

export default connect(mapStateToProps)(ForgotPasswordPage);