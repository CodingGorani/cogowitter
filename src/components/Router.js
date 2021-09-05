import React, { useState } from 'react';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from 'components/Nav';

function AppRouter({ refreshUser, isLoggedIn, userObj }) {
  return (
    <Router>
      {isLoggedIn && <Nav userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile refreshUser={refreshUser} userObj={userObj} />
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
