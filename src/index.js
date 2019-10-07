import React from 'react';
import { render } from 'react-dom';
import CafePicker from "./components/CafePicker";
import App from "./components/App";
import Router from "./components/Router";
import './css/style.css';

// This is another way of importing just the Component from the react module
// import { Component } from 'react';



render(<Router />, document.querySelector('#main'));