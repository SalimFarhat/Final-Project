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
import AdminPrev from "./AdminPages/AdminPrev"
import ModifySchedule from "./ModifySchedule";
import ErrorPage from "./ErrorPage"
import Workoutpage from "./Workoutpage";
import ClientPrevClass from "./ClientPrevClass";
import ClassInfo from "./ClassInfo";



function App() {
  return (
    <BrowserRouter>
    <GlobalStyles />
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/classinfo" element={<ClassInfo />}/>
        <Route path="/schedule" element={<Schedule />}/>
        <Route path="/class/:classId" element={<Workoutpage />}/>
        <Route path="/login" element={<LogIn />} />
        <Route path="/modifyschedule" element={<ModifySchedule />} />
        <Route path="/yourpreviousclasses" element={<ClientPrevClass />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/adminpage/admincreate" element={<AdminCreate />} />
        <Route path="/adminpage/adminremove" element={<AdminRemove />} />
        <Route path="/adminpage/adminedit" element={<AdminEdit />} />
        <Route path="/adminpage/adminprev" element={<AdminPrev />} />
        <Route path="/*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;