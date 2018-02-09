import React from 'react';
import { ThemeProvider } from '/Users/Timothy/AwesomeProject/node_modules/react-native-material-ui';
import { BottomNavigation } from '/Users/Timothy/AwesomeProject/node_modules/react-native-material-ui';


const Bottom = () => {
  return(
  	  <ThemeProvider>
			<BottomNavigation hidden={false} >
				<BottomNavigation.Action
					key="dashboard"
					icon="dashboard"
					label="Dashboard"
					onPress={() => this.setState({ active: 'today' })}
				/>
				<BottomNavigation.Action
					key="explore"
					icon="explore"
					label="Explore"
					onPress={() => this.setState({ active: 'people' })}
				/>
				<BottomNavigation.Action
					key="trending-up"
					icon="trending-up"
					label="Discover"
					onPress={() => this.setState({ active: 'bookmark-border' })}
				/>
				<BottomNavigation.Action
					key="settings"
					icon="settings"
					label="Settings"
					onPress={() => this.setState({ active: 'settings' })}
				/>
			</BottomNavigation>
		</ThemeProvider>);
};

export default Bottom;