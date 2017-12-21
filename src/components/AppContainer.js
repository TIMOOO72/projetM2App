import React, { Component } from 'react';
import { View, Text, Button, Image, WebView, Linking } from 'react-native';
import { connect } from 'react-redux';
import { fetchSeries } from "../actions";
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
	
	renderContent() {
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
      }
      
      updateInputValue(e){
          this.setState({
              inputValue:e.target.value
          })
      }
	
     async testConnection(){
		try{
			console.log('TEST CO');
			let res = await axios.get("http://10.188.38.127:5000/api/testMobile");
			console.log('TEST CO 2');
			this.setState({res});
			 return(
			<View>
				<Text> BLABLA </Text>
				<Text>{this.state.res}</Text>
			</View>
			);
		}
		catch(error){
			console.error(error);
		}
     	
	}
	
	render() {
		return (
			<View>
				<Button
				 	onPress={ () => this.testConnection()}
				 		title="TEST CO"
				 		color="#841584"
				 		accessibilityLabel="Learn more about this purple button"
				 	/>
				<Button
				 	onPress={ () => this.props.fetchSeries(this.state.inputValue)}
				 		title="Search serie"
				 		color="#841584"
				 		accessibilityLabel="Learn more about this purple button"
				 	/>
				 
				 {this.renderContent()}
			</View>
		);
	}
}

function mapStateToProps({ series }) {
    return { series };
  }

export default connect(mapStateToProps, { fetchSeries })(AppContainer);