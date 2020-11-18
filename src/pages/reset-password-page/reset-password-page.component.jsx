import React from 'react';

// components
import Title from '../../components/title/title.component';
import ResetPassword from '../../components/reset-password/reset-password.component';
import Tabbar from '../../components/tabbar/tabbar.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectResetPasswordTabbar } from '../../state/tabbar/tabbar.selectors';

// ui settings
import './reset-password-page.styles.css';
const titleSettings = {
  title: 'Reset Password',
  button: undefined
}

const ResetPasswordPage = ({ resetPasswordTabbar }) => {

  const { selectedTab, list } = resetPasswordTabbar;

  return <>
    <Title settings={titleSettings} />
    <Tabbar 
      tabbarList={list} 
      selectedTab={selectedTab}
    />
    { selectedTab === 1 && <ResetPassword /> }
  </>
}

const mapStateToProps = createStructuredSelector({
  resetPasswordTabbar: selectResetPasswordTabbar
})

export default connect(mapStateToProps)(ResetPasswordPage);