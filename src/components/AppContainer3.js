import { google } from 'react-native-simple-auth';

google({
        appId: '958303494758-m3n4mn5af5mf1koil07i9v1qlvlu1rpa.apps.googleusercontent.com',
        callback: 'http://projetm2-lemans.herokuapp.com/auth/google',
}).then((info) => {
  info.user //- user details from the provider
  info.credentials //- tokens from the provider
}).catch((error) => {
   error.code
   error.description
});