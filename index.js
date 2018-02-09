import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import AppCL from './src/components/AppCL';
import AppCA from './src/components/AppCA';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './src/reducers';
import { StackNavigator } from 'react-navigation';
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

const navigation = StackNavigator({
		Login: {screen: AppCL},
		Main: {screen: AppCA}
});

export default class App extends Component {
	render () {
		return(
			<Provider store={store}>
				<AppContainer/>
			</Provider>
		);
	}
}

AppRegistry.registerComponent('AwesomeProject', () => navigation);