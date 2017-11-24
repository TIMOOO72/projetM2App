import React from 'react';
import {AppRegistry} from 'react-native'
import Header from "./src/components/header.js";

const App = () => (
  <Header/>
);


AppRegistry.registerComponent('AwesomeProject', () => App);
