import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import AppContainer from './src/components/AppContainer';
import Header from './src/components/header.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './src/reducers';

// middleware that logs actions

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

export default class App extends Component {
	render () {
		return(
			<View>
				<Header />
				<Provider store={store}>
					<AppContainer/>
				</Provider>
			</View>
		);
	}
}

AppRegistry.registerComponent('AwesomeProject', () => App);