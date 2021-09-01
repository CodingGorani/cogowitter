import React, { useState } from 'react';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from 'components/Nav';

function AppRouter({ isLoggedIn }) {
  return (
    <Router>
      {isLoggedIn && <Nav />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;
