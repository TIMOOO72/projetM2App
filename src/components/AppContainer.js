import React, { Component } from 'react';
import { View, Text, Button, Image, WebView, Linking } from 'react-native';
import { connect } from 'react-redux';
import { fetchSerieCollection } from "../actions";
import axios from 'axios';

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
			<View >
				
				<Button
				 	onPress={ () => this.testConnection()}
				 		title="TEST CO"
				 		color="#841584"
				 		accessibilityLabel="Learn more about this purple button"
				 	/>
				{this.renderContent()}
			</View>
		);
	}
}

function mapStateToProps({ auth, serieCollection }) {
    return { auth, serieCollection };
  }

export default connect(mapStateToProps, { fetchSerieCollection })(AppContainer);