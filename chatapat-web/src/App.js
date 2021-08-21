import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import logo from './logo.svg';
import './App.css';
import {Route, Switch, withRouter} from "react-router-dom";
import {useLocation} from "react-router";
import {authenticatedRoutes, permittedAllRoutes} from "./routes/AppRoutes";

const  App = props => {
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname !== '/login') {
      // props.getCurrentUser();
    }
  }, [location, props]);

  const permittedRoutes = Object.keys(permittedAllRoutes).map(key => (
      <Route
        path={permittedAllRoutes[key].path}
        component={permittedAllRoutes[key].component}
        key={key}
        exact={permittedAllRoutes[key].exact}
      />
  ));
  const authRoutes  = Object.keys(authenticatedRoutes).map(key => (
      <Route
          path={authenticatedRoutes[key].path}
          component={authenticatedRoutes[key].component}
          key={key}
          exact={authenticatedRoutes[key].exact}
      />
  ));
  // const routes = Object.keys()
  return (

  <React.Fragment>
    <Switch>
      {/* key causes component rerender for different routes that are using one component */}
      {/*<Route*/}
      {/*    path={permittedAllRoutes.login.path}*/}
      {/*    component={permittedAllRoutes.login.component}*/}
      {/*    key={allRoutes.login.key}*/}
      {/*    exact={true}*/}
      {/*/>*/}
      {/* <Route path={allRoutes.notFound.path} component={NotFound} /> */}

      {/*<Route path={allRoutes.base.path} component={AppLayout} />*/}

      {permittedRoutes}
      {authRoutes}
    </Switch>
  </React.Fragment>
  );
}

// const mapDispatchToProps = { getCurrentUser };
//
// export default connect(null, mapDispatchToProps)(withRouter(App));
export default App;
