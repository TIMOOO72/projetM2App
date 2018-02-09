import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';
import Login from './login.js'

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});


class AppCL extends Component {

   
   render(){
      return (
      	  <Provider store={store}>
      	  	<Login navigation={this.props.navigation}/>
      	  </Provider>
      )
   }
}
export default AppCL
