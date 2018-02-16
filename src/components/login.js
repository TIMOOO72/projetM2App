import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';
import { fetchSerieCollection } from "../actions";
import axios from 'axios';
import Header from "./header.js";

function configureStore(initialState) {
	   const enhancer = compose(
		   applyMiddleware(
		   thunkMiddleware, // lets us dispatch() functions
		   ),
	  );
	  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

class Login extends Component {
	static navigationOptions = { title: 'Welcome', header: { visible:false } };
	
	constructor(props){
        super(props);
        console.log('CONSTRUCTOR');
        this.testNav = this.testNav.bind(this)
    }
   state = {
      email: '',
      password: ''
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   login = (email, pass) => {
      alert('email: ' + email + ' password: ' + pass)
   }

    componentDidMount() {
      this.props.fetchSerieCollection();
    }
	
    
    componentDidUpdate() {
      this.props.fetchSerieCollection();
      
    }
   
   async testConnection(){
			const uri = 'http://projetm2-lemans.herokuapp.com/api/login';
			const res = await axios.post(uri, {email:this.state.email, password:this.state.password})
			.then((response) => {
					setTimeout(() => {
							console.log('I do not leak!');
					}, 500);
					console.log('login response', response);
					this.props.fetchSerieCollection();
					console.log(this.props.serieCollection);
					
			});
	}
	
	testNav(){
		var {navigate} = this.props.navigation;
		this.testConnection(); 
		console.log("connection fini")
		navigate("Main",{})
	}
	
   
   render(){
      return (
			  <Provider store={store}>
					
				 <View style = {styles.container}>
					<TextInput style = {styles.input}
					   underlineColorAndroid = "transparent"
					   placeholder = "Email"
					   placeholderTextColor = "#9a73ef"
					   autoCapitalize = "none"
					   onChangeText = {this.handleEmail}/>
					
					<TextInput style = {styles.input}
					   underlineColorAndroid = "transparent"
					   placeholder = "Password"
					   placeholderTextColor = "#9a73ef"
					   autoCapitalize = "none"
					   onChangeText = {this.handlePassword}/>
					   
					<TouchableOpacity
					   style = {styles.submitButton}
					   onPress = {
						  () => this.testNav()
								
					   }>
					   <Text style = {styles.submitButtonText}> Submit </Text>
					</TouchableOpacity>
				 </View>
			</Provider>
      )
   }
}

function mapStateToProps({ auth, serieCollection }) {
    return { auth, serieCollection };
  }

export default connect(mapStateToProps, { fetchSerieCollection })(Login)

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})