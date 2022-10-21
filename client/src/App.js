import ShaeTest from "./components/ShaeTest/ShaeTest" ;
import AqmalTest from "./components/AqmalTest/AqmalTest";
import TimetableView from "./components/Timetable/TimetableView";
import AdminHome from "./components/Admin/AdminHome";
import CreateClass from "./components/Admin/CreateClass";

import "./App.css";
import Home from "./components/authentication/Home";

import { Route, Routes } from "react-router-dom";
import Signup from "./components/authentication/Signup";
import StudentHome from "./components/Student/StudentHome";
import EditProfile from "./components/profiles/EditProfile";
import ChangeClassDetails from "./components/email/ChangeClassDetails";

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
  console.log(userToken);
}

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }

function App() {
  return (
    <Routes>
      <Route  exact path="/" element={<Home setToken={setToken} />} />
      <Route  path="/signup" element={<Signup />} />
      <Route path="/shae" element={<ShaeTest />}/>
      <Route path="/aqmal" element={<AqmalTest />}/>
      <Route path="/Timetable" element={<TimetableView />} />
      <Route  path="/student-test" element={<StudentHome />} />
      <Route  path="/edit-test" element={<EditProfile />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/create-class" element={<CreateClass />} />
      <Route  path="/email" element={<ChangeClassDetails />} />

    </Routes>
    
  );
}

export default App;
