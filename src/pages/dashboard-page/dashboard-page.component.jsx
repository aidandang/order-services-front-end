import React from 'react';

// components
import Title from '../../components/title/title.component';

const DashboardPage = () => {

  const title = {
    name: 'Dashboard'
  }

  return <>
    <Title title={title} />
  </>
}

export default DashboardPage;