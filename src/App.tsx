import React from 'react';
import './App.css';
import "firebase/database";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'

import PokerGame from './components/Game/PokerGame';
import Home from './components/Home/Home';


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/game/:id">
            <PokerGameWrapper />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div> 
  );
}


function PokerGameWrapper() {
  interface PokerPathParams {
    id: string,
  }
  let params = useParams<PokerPathParams>();
  return (
    <PokerGame gameId={params.id}/>
  )
}

export default App;
