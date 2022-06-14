import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SignedInProvider } from './Context/SignedInContext';
import { CourseProvider} from './Context/CourseContext';
import { Auth0Provider } from "@auth0/auth0-react";



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
