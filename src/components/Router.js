import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CafePicker from "./CafePicker";
import App from "./App";
import NotFound from "./NotFound";

const Router = () => (

    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={CafePicker}/>
            <Route path="/cafe/:cafeId" component={App} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;