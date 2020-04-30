import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { PollScreen } from './pages/PollScreen';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/movie-poll" component={PollScreen} />
    </Switch>
  </Router>
);

export default App;
