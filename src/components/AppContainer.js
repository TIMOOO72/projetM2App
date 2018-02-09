import React, { Component } from 'react';
import { View, Text, Button, Image, WebView, Linking, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Header from "./header.js";
import Bottom from "./bottom.js";
import { fetchSerieCollection } from "../actions";
import axios from 'axios';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';
import { ThemeProvider } from '/Users/Timothy/AwesomeProject/node_modules/react-native-material-ui';
import { BottomNavigation } from '/Users/Timothy/AwesomeProject/node_modules/react-native-material-ui';



function configureStore(initialState) {
	   const enhancer = compose(
		   applyMiddleware(
		   thunkMiddleware, // lets us dispatch() functions
		   ),
	  );
	  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

class AppContainer extends Component {
	
	
	
	constructor(props){
        super(props);
        console.log('CONSTRUCTOR');
        this.renderContent= this.renderContent.bind(this);
        this.updateInputValue= this.updateInputValue.bind(this);
        this.testConnection = this.testConnection.bind(this);
        this.state={inputValue:"game"};
    }
    
    componentDidMount() {
      this.props.fetchSerieCollection();
    }
	
    
    componentDidUpdate() {
      this.props.fetchSerieCollection();
      
    }
	/*renderContent2() {
		console.log('RENDER CONTENT');
        return this.props.series.map((serie) => {
        		return(
        			<View key={serie.id}>
        				<Text> {serie.name}</Text>
        				<Image 
        				style={{width:50, height:50}}
        				source={ {uri: "https://image.tmdb.org/t/p/w500"+serie.poster_path} } />
        			</View>
        		);
        });
      }*/
      
      renderContent() {
      	  console.log("render");
      	  console.log(this.props.serieCollection);
      	  return this.props.serieCollection.map((serieUser) => {
			  return (
				<View key={serieUser.title}>
					<Text > {serieUser.title}</Text>
					<Image 
					style={{width:50, height:50}}
					source={{uri: serieUser.poster}} />
				</View>
			  );
        });
      }
      
      updateInputValue(e){
          this.setState({
              inputValue:e.target.value
          })
      }
	
     async testConnection(){
			const uri = 'http://projetm2-lemans.herokuapp.com/api/login';
			const res = await axios.post(uri, {email:"jean72@gmail.com", password:"aaaa"})
			.then((response) => {
					console.log('login response', response);
					this.props.fetchSerieCollection();
					console.log(this.props.serieCollection);
					
			});
	}
	
	render() {
		return (
			<Provider store={store}>
				<View style={{flex: 1}} >
					<View style={{flex: 0.9}}>
						<Header/>			
						<ScrollView>
							{this.renderContent()}
						</ScrollView>
					</View>
					<View style={{flex: 0.1}}>
						<ThemeProvider>
							<BottomNavigation hidden={false} >
								<BottomNavigation.Action
									key="dashboard"
									icon="dashboard"
									label="Dashboard"
									onPress={() => this.setState({ active: 'dashboard' })}
								/>
								<BottomNavigation.Action
									key="explore"
									icon="explore"
									label="Explore"
									onPress={() => this.setState({ active: 'explore' })}
								/>
								<BottomNavigation.Action
									key="trending-up"
									icon="trending-up"
									label="Discover"
									onPress={() => this.setState({ active: 'trending-up' })}
								/>
								<BottomNavigation.Action
									key="settings"
									icon="settings"
									label="Settings"
									onPress={() => this.setState({ active: 'setting' })}
								/>
							</BottomNavigation>
						</ThemeProvider>);
					</View>
				</View>
			</Provider>
		);
	}
}



function mapStateToProps({ auth, serieCollection }) {
    return { auth, serieCollection };
  }

export default connect(mapStateToProps, { fetchSerieCollection })(AppContainer);