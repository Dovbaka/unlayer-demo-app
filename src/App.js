import React, {useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import UnlayerEditor from "./components/Editor/UnlayerEditor";
import Consumer from "./components/Consumer/Consumer";
import HtmlCode from "./components/HtmlCode/HtmlCode";
import styles from "./App.module.css";

const App = () => {

    //Keys for local storage
    const exportedJsonDesignLocalKey = 'unlayer-exported-Json';
    const savedJsonDesignLocalKey = 'unlayer-editor-auto-saved-json-design';

    //Testing values for tags
    const price = "{{mustache_value}}"
    const image = "<img src='https://img2.pngio.com/png-test-image-picture-1970856-png-test-" +
        "image-this-is-a-test-png-256_285.png' alt='img' style='display: block; margin: 0 auto'/>"



    return (
        <div className={styles.app_wrapper}>
            <BrowserRouter>
                <Switch>
                    <Route path={`/`} exact={true} render={() =>
                        <UnlayerEditor price={price} image={image}
                                       exportedJsonDesignLocalKey={exportedJsonDesignLocalKey}
                                       savedJsonDesignLocalKey={savedJsonDesignLocalKey}/>}/>

                    <Route path={`/consumer`} render={() => <Consumer/>}/>
                    <Route path={`/htmlcode`} render={() => <HtmlCode/>}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
