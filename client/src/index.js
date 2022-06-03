import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SignedInProvider } from './Context/SignedInContext';

//we will need two providers. One for the classes, and the other for the signed in user.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <SignedInProvider>
        <App />
  </SignedInProvider>
  </React.StrictMode>
);


// root.render(
//   <React.StrictMode>
//     <classprovider>
//       <signedinProvider>
//         <App />
//         </signedinProvider>

//     </classprovider>
//   </React.StrictMode>
// );
