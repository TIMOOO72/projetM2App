import React from 'react';
import { ThemeProvider } from '/Users/Timothy/AwesomeProject/node_modules/react-native-material-ui';
import { Toolbar } from '/Users/Timothy/AwesomeProject/node_modules/react-native-material-ui';

const Header = () => {
  return(
    <ThemeProvider>
      <Toolbar
        leftElement="menu"
        centerElement="Media Monster"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
          }}
      />
    </ThemeProvider>);
};

export default Header;
