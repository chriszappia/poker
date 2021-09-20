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
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';


function App() {

  return (
    <div className="App">
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

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
      </PersistGate>
      </Provider>
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
