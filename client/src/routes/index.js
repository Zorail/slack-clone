import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import {
  Home,
  Register,
  Login,
  CreateTeam,
}
  from '../Containers/index';

const route = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/createTeam" exact component={CreateTeam} />
    </Switch>
  </BrowserRouter>
);

export default route;
