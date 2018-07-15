import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import Home from '../Containers/index';

const route = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </BrowserRouter>
);

export default route;
