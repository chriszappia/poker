import React from "react";
import "./App.css";
import "firebase/database";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import PokerGame from "./components/Game/PokerGame";
import Home from "./components/Home/Home";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { PokerRoute } from "./util/Routes";

function App(): JSX.Element {
    return (
        <div className="App">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <Header />
                        <Switch>
                            <Route path={PokerRoute.GAME}>
                                <PokerGameWrapper />
                            </Route>
                            <Route exact path={PokerRoute.HOME}>
                                <Home />
                            </Route>
                        </Switch>
                        <Footer />
                    </Router>
                </PersistGate>
            </Provider>
        </div>
    );
}

function PokerGameWrapper() {
    interface PokerPathParams {
        id: string;
    }
    const params = useParams<PokerPathParams>();
    return <PokerGame gameId={params.id} />;
}

export default App;
