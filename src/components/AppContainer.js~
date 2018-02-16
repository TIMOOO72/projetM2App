import React, { Component } from 'react';
import { View, Text, Button, Image, WebView, Linking, StyleSheet, ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Header from "./header.js";
import Bottom from "./bottom.js";
import { fetchSerieCollection, fetchSeries, fetchPopular } from "../actions";
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
        this.renderContentDash= this.renderContentDash.bind(this);
        this.renderContentExp= this.renderContentExp.bind(this);
        this.testConnection = this.testConnection.bind(this);
        this.dashboard = this.dashboard.bind(this);
        this.explore = this.explore.bind(this);
        this.trending = this.trending.bind(this);
        this.setting = this.setting.bind(this);
        this.state={inputValue:"game"};
        this.state={dashboard:true};
        this.state={explore: false};
        this.state={trending: false};
        this.state={setting: false};
        console.log('CONSTRUCTOR END');
    }
    
    componentDidMount() {
      this.props.fetchSerieCollection();
    }
	
    
    componentDidUpdate() {
      this.props.fetchSerieCollection();
      
    }
    
    renderContentPop() {
		console.log('RENDER CONTENT');
		this.props.fetchPopular()
		setTimeout(() => {
							this.props.fetchPopular();
					}, 500);
		console.log(this.props.popular);
        return this.props.popular.map((serie) => {
        		return(
        			<View key={serie.id}>
        				<Text> {serie.name}</Text>
        				<Image 
        				style={{width:50, height:50}}
        				source={ {uri: "https://image.tmdb.org/t/p/w500"+serie.poster_path} } />
        			</View>
        		);
        });
      }
    
    
    
	renderContentExp() {
		console.log('RENDER CONTENT');
		this.props.fetchSeries(this.state.inputValue);
		setTimeout(() => {
							console.log('I do not leak!');
					}, 500);
		console.log(this.props.series);
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
      }
      handleSearch = (text) => {
      this.setState({ inputValue: text })
   }
      
      renderContentExp2(){
      	  return(
      	  	  <View>
				  <TextInput style = {styles.input}
					   underlineColorAndroid = "transparent"
					   placeholder = "Search"
					   placeholderTextColor = "#9a73ef"
					   autoCapitalize = "none"
					   onChangeText = {this.handleSearch}/>
					   {this.renderContentExp()}
			</View>
		);
	}
				   
      
      renderContentDash() {
      	  this.props.fetchSerieCollection();
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
      
	
     async testConnection(){
			const uri = 'http://projetm2-lemans.herokuapp.com/api/login';
			const res = await axios.post(uri, {email:"jean72@gmail.com", password:"aaaa"})
			.then((response) => {
					console.log('login response', response);
					this.props.fetchSerieCollection();
					console.log(this.props.serieCollection);
					
			});
	}
	
	dashboard(){
		this.setState({ dashboard: true });
		this.setState({ explore: false });
		this.setState({ trending: false });
		this.setState({ setting: false })
	}
	
	explore(){
		this.setState({ dashboard: false });
		this.setState({ explore: true });
		this.setState({ trending: false });
		this.setState({ setting: false })
	}
	
	trending(){
		this.setState({ dashboard: false });
		this.setState({ explore: false });
		this.setState({ trending: true });
		this.setState({ setting: false })
	}
	
	setting(){
		this.setState({ dashboard: false });
		this.setState({ explore: false });
		this.setState({ trending: false });
		this.setState({ setting: true })
	}
	
	render() {
		return (
			<Provider store={store}>
				<View style={{flex: 1}} >
					<View style={{flex: 0.9}}>
						<Header/>			
						<ScrollView>
							{this.state.dashboard
								? this.renderContentDash()
								: null}
							{this.state.explore
								? this.renderContentExp2()
								: null}
							{this.state.trending
								? this.renderContentPop()
								: null}
						</ScrollView>
					</View>
					<View style={{flex: 0.1}}>
						<ThemeProvider>
							<BottomNavigation hidden={false} >
								<BottomNavigation.Action
									key="dashboard"
									icon="dashboard"
									label="Dashboard"
									onPress={() => this.dashboard()}
								/>
								<BottomNavigation.Action
									key="explore"
									icon="explore"
									label="Explore"
									onPress={() => this.explore()}
								/>
								<BottomNavigation.Action
									key="trending-up"
									icon="trending-up"
									label="Discover"
									onPress={() => this.trending()}
								/>
								<BottomNavigation.Action
									key="settings"
									icon="settings"
									label="Settings"
									onPress={() => this.setting()}
								/>
							</BottomNavigation>
						</ThemeProvider>
					</View>
				</View>
			</Provider>
		);
	}
}



function mapStateToProps({ auth, serieCollection, series, popular }) {
    return { auth, serieCollection, series, popular };
  }
  


export default connect(mapStateToProps, { fetchSerieCollection, fetchSeries, fetchPopular })(AppContainer);

const styles = StyleSheet.create({
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   }
})