// // IMPORT EXTERNAL LIBRARIES/MODULES
import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {ReactReduxContext} from "react-redux";

const PrivateRoute = ({component: Component, ...rest}) => {
    const {store} = useContext(ReactReduxContext);
    /* Get user form either store or from localSotrage */
    const userName = store.getState().auth.user || JSON.parse(localStorage.getItem('user'));
    /* If userName is found i.e. if user is logged in then show Componet else redirect to login page */
    return (
        <Route {...rest} render={props => (
            userName !== ""
                ? <Component {...props} />
                : <Redirect to={{pathname: '/', state: {from: props.location}}}/>
        )}/>
    )
}

export default PrivateRoute;