import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Storepicker from './Storepicker.js';
import App from './App.js';
import NotFound from './NotFound.js';



const Router = () =>(
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Storepicker} />
        <Route exact path="/store/:storeId" component={App} />
        <Route component={NotFound} />
    </Switch>
    </BrowserRouter>
);
export default Router;