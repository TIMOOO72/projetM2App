import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';
import AppContainer from './AppContainer.js'

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});


class AppCA extends Component {

   
   render(){
      return (
      	  <Provider store={store}>
      	  	<AppContainer navigation={this.props.navigation}/>
      	  </Provider>
      )
   }
}
export default AppCA
