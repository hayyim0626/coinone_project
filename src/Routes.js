import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Pages/Main/Main';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Exchange from './Pages/Exchange/Exchange';
import Profit from './Pages/Profit/Profit';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/main" component={Main} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/exchange" component={Exchange} />
          <Route exact path="/profit" component={Profit} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
