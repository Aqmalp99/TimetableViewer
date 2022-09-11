import ShaeTest from "./components/ShaeTest/ShaeTest" ;
import TimetableView from "./components/Timetable/TimetableView";

import "./App.css";
import Home from "./components/authentication/Home";

import { Route, Routes } from "react-router-dom";
import Signup from "./components/authentication/Signup";
import StudentHome from "./components/Student/StudentHome";
import EditProfile from "./components/profiles/EditProfile";

function App() {
  return (
    <Routes>
      <Route  exact path="/" element={<Home />} />

      <Route  path="/signup" element={<Signup />} />
      <Route  path="/student-test" element={<StudentHome />} />
      <Route  path="/edit-test" element={<EditProfile />} />
      {/* <Route path="/shae" element={<ShaeTest />}/> */}
      {/* <Route path="/Timetable" element={<TimetableView />} /> */}
    </Routes>
    
  );
}

export default App;
