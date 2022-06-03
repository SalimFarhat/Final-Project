// import React from "react";
// import styled from "styled-components";
import {Route, Switch} from "react-router";
// import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import HomePage from "./HomePage";
import Schedule from "./Schedule";


const App = () => {

  return (
    <Switch>
      <Route>
        
      </Route>

    </Switch>

  );
}

// const Main = styled.div`

// `;

export default App;



// const App = () => {
//   return (

//     <BrowserRouter>
//     {/* <GlobalStyles /> */}
//     <Header />
//       <div>
//         <Switch>
//           <Route exact path="/">
//             <HomePage />
//           </Route>
//           <Route exact path="/schedule">
//             <Schedule />
//           </Route>
//         </Switch>
//       </div>

//     </BrowserRouter>

//   );