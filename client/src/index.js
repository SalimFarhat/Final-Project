import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SignedInProvider } from './Context/SignedInContext';
import { CourseProvider} from './Context/CourseContext';
import { Auth0Provider } from "@auth0/auth0-react";

//we will need two providers. One for the classes, and the other for the signed in user.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
  <CourseProvider>
    <SignedInProvider>
        <App />
    </SignedInProvider>
  </CourseProvider>
  </React.StrictMode>
);



//number1
// root.render(
//   <React.StrictMode>
//     <classprovider>
//       <signedinProvider>
//         <App />
//         </signedinProvider>

//     </classprovider>
//   </React.StrictMode>
// );

//number2

// root.render(
//   <React.StrictMode>
//   <SignedInProvider>
//         <App />
//   </SignedInProvider>
//   </React.StrictMode>
// );


//number 2
// root.render(
//   <React.StrictMode>
//     <Auth0Provider
//     clientId='jTjdaq23KUdID018NSsZr9dH5VNJtosp'
//     domain='https://dev-0s0nqekt.us.auth0.com'
//     redirectUri='http://localhost:8000/test'
//     >
//   <CourseProvider>
//     <SignedInProvider>
//         <App />
//     </SignedInProvider>
//   </CourseProvider>
//   </Auth0Provider>
//   </React.StrictMode>
// );



// <Auth0Provider
// clientId='jTjdaq23KUdID018NSsZr9dH5VNJtosp'
// domain='https://dev-0s0nqekt.us.auth0.com'
// redirectUri='http://localhost:3000/login'
// audience="https://dev-0s0nqekt.us.auth0.com/api/v2/"
// scope="read:current_user update:current_user_metadata">
  
//   </Auth0Provider>