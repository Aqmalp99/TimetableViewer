import ShaeTest from "./components/ShaeTest/ShaeTest" ;
import Calendar from "./components/calendar/Calendar";

import "./App.css";
// import Home from "./components/login/Home";
import Login from "./components/authentication/Login";
// import NavbarLogin from "./components/Navbar/NavbarLogin";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route  exact path="/" element={<Login />} />

      <Route path="/shae" element={<ShaeTest />}/>
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
    
  );
}

export default App;




