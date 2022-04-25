import './App.css';
import {Route, Switch } from 'react-router-dom';
import React,{Component} from "react";
import WebNavbar from './HelperComponents/WebNavbar';
import UploadDoc from './components/UploadDoc';
import HomePage from './components/HomePage';
import Error from './components/Error';
import About from './components/About';
import Result from './components/Result';

function App() {
  return (
    <div>
    <WebNavbar></WebNavbar>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/About" component={About}/>
      <Route path="/UploadDoc" component={UploadDoc}/>
      <Route path="/Result" component={Result}/>
      <Route component={Error} />
    </Switch>
    </div>
  );
}

export default App;
