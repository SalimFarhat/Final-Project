// import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import HomePage from "./HomePage";
import Schedule from "./Schedule";


function App() {

  return (
    <BrowserRouter>
    <GlobalStyles />
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/schedule" element={<Schedule />}/>

      </Routes>
    </BrowserRouter>

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