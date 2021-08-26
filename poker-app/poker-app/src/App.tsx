import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/database";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import PokerGame from './components/Game/PokerGame';
import Home from './components/Home/Home';


function App() {


  return (
    <Router>
      <Switch>
        <Route path="/game">
          <PokerGame />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
