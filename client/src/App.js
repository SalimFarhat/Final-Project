// import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import HomePage from "./HomePage";
import Schedule from "./Schedule";
import LogIn from "./LogIn";
import AdminCreate from "./AdminPages/AdminCreate";
import AdminEdit from "./AdminPages/AdminEdit";
import AdminPage from "./AdminPages/AdminPage";
import AdminRemove from "./AdminPages/AdminRemove";


function App() {

  return (
    <BrowserRouter>
    <GlobalStyles />
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/schedule" element={<Schedule />}/>
        <Route path="/login" element={<LogIn />} />
        {/* <Route path="/schedule/:id" /> */}
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/adminpage/admincreate" element={<AdminCreate />} />
        <Route path="/adminpage/adminremove" element={<AdminRemove />} />
        <Route path="/adminpage/adminedit" element={<AdminEdit />} />
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