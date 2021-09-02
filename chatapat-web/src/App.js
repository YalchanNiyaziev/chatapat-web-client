import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import {useLocation} from "react-router";
import {authenticatedRoutes, permittedAllRoutes, unauthenticatedRoutes} from "./routes/AppRoutes";
import AuthService from "./service/AuthService";
// import { connect } from 'react-redux';


const App = props => {
    const location = useLocation();
    const authService = new AuthService();

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


    const unAuthRoutes = Object.keys(unauthenticatedRoutes).map(key => {
        if (!authService.getUsername()) {
            return (
                <Route
                    path={unauthenticatedRoutes[key].path}
                    component={unauthenticatedRoutes[key].component}
                    key={key}
                    exact={unauthenticatedRoutes[key].exact}
                />)
        }
        return '';
    });

    // const unAuthRoutes = Object.keys(unauthenticatedRoutes).map(key => (
    //     <Route
    //             // render={({location}) =>
    //             //     authService.getUsername()?(<Redirect to={{
    //             //         pathname: authenticatedRoutes.main.path,
    //             //         state: {from: location},
    //             //     }}/>):(permittedAllRoutes[key].component)
    //             //     }
    //
    //             path={unauthenticatedRoutes[key].path}
    //             component={unauthenticatedRoutes[key].component}
    //             key={key}
    //             exact={unauthenticatedRoutes[key].exact}
    //         />
    // ));


    const authRoutes = Object.keys(authenticatedRoutes).map(key => {
        if (authService.getUsername()) {
            return (
                <Route
                    path={authenticatedRoutes[key].path}
                    component={authenticatedRoutes[key].component}
                    key={key}
                    exact={authenticatedRoutes[key].exact}
                />)
        }
        return '';
    });

    const unPermittedRoutesHandling = () => {
        const pathList = [];
        if (authService.getUsername()) {
            Object.keys(unauthenticatedRoutes)
                .forEach(p => pathList.push(unauthenticatedRoutes[p].path));
            console.log("You ar eIN. Unauthenticated PAths", pathList);

            return (
                <Route path={pathList}>
                    <Redirect to={authenticatedRoutes.main.path}/>
                </Route>
            );
        } else {
            Object.keys(authenticatedRoutes)
                .forEach(p => pathList.push(authenticatedRoutes[p].path));
            console.log("Authenticated Paths. You are not logged", pathList);
            return (
                <Route path={pathList}>
                    <Redirect to={unauthenticatedRoutes.login.path}/>
                </Route>

            );
        }
    }

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
                {/*{!authService.getUsername()?unAuthRoutes:''}*/}
                {/*{authService.getUsername()?authRoutes:''}*/}
                {unAuthRoutes}
                {authRoutes}
                {unPermittedRoutesHandling()}
                <Route path="*">
                    <Redirect to={permittedAllRoutes.notFound.path}/>
                </Route>
            </Switch>
        </React.Fragment>
    );
}

// const mapDispatchToProps = { getCurrentUser };
//
// export default connect(null, mapDispatchToProps)(withRouter(App));
// export default withRouter(App);
export default App;