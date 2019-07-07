import { withRouter } from 'react-router';
import React from 'react';

class RouteChange extends React.Component {
  componentDidMount() {
    this.routeChanged();
  }

  componentDidUpdate(prevProps: any) {
    let {
      location: { pathname }
    } = this.props as any;

    if (prevProps.location.pathname === pathname) return;
    this.routeChanged();
  }

  routeChanged() {
    let { location, push, replace, actions } = this.props as any;

    actions.forEach((action: any) => {
      action(location, { push, replace });
    });
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(props => <RouteChange {...props} />) as any;
