import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CafePicker from "./CafePicker";

const Router = () => (

    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={CafePicker}/>
        </Switch>
    </BrowserRouter>
);

export default Router;