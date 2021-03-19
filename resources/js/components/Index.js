import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,
    Switch,
    Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard';
import Landing from './containers/Landing';
import Login from './containers/login';


function Example() {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/" exact component={Landing} />
            </Switch>
        </Router>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
