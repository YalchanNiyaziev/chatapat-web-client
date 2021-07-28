import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch, withRouter} from "react-router-dom";
import {useLocation} from "react-router";

const  App = props => {
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname !== '/login') {
      // props.getCurrentUser();
    }
  }, [location, props]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  // <React.Fragment>
  //   <Switch>
  //     {/* key causes component rerender for different routes that are using one component */}
  //     <Route
  //         path={allRoutes.login.path}
  //         component={allRoutes.login.component}
  //         key={allRoutes.login.key}
  //         exact={true}
  //     />
  //     {/* <Route path={allRoutes.notFound.path} component={NotFound} /> */}
  //
  //     <Route path={allRoutes.base.path} component={AppLayout} />
  //   </Switch>
  // </React.Fragment>
  );
}

// const mapDispatchToProps = { getCurrentUser };
//
// export default connect(null, mapDispatchToProps)(withRouter(App));
export default App;
