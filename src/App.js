import React from 'react';
import { BrowserRouter , Switch, Route } from 'react-router-dom';
import Editor from "./components/Editor/Editor";
import Consumer from "./components/Consumer/Consumer";
import styles from "./App.module.css"

const App = () => {

    return (
        <div className={styles.app_wrapper}>
            <BrowserRouter>
                <Switch>
                    <Route path={`/`} exact={true} render={() => <Editor />} />
                    <Route path={`/consumer`} render={() => <Consumer />} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
