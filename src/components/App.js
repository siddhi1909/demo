import React from 'react';
import './../index.css';
import Dashboard from './Dashboard';
import {createBrowserHistory} from 'history';
import {Provider} from "react-redux";
import LoginComponent from './LoginComponent';
import PrivateRoute from '../routes/PrivateRoute';
import store from '../redux/store';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

export default function App() {
    const Notfound = () => <h1> 404 Not found</h1>
    const history = createBrowserHistory();
    return (
        <Provider store={store}>
            <Router basename="/" history={history}>
                <Switch>
                    <Route exact path="/" component={LoginComponent}/>
                    <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                    <Route path="*" component={Notfound}/>
                </Switch>
            </Router>
        </Provider>
    );
}