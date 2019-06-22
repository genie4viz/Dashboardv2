import React from 'react';

import '../styles/main.sass';

import SecurityContainer from '../components/Security';
import AuthenticatedPage from '../components/Layout/AuthenticatedPage';

class SecurityPage extends AuthenticatedPage {
  static async getInitialProps({ req, query }) {
    const props = await super.getInitialProps({ req, query });
    
    return { ...props, securityId: query.id, short_security: JSON.parse(query.short_security)};
  }
  render() {
    return <SecurityContainer {...this.props} />;
  }
}

export default SecurityPage;
