
// import Calendar from "./components/calendar/Calendar";

import "./App.css";
// import Home from "./components/login/Home";
// import Login from "./components/login/Login";
import NavbarLogin from "./components/Navbar/NavbarLogin";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route  exact path="/" element={<NavbarLogin />} />

      {/* <Route path="/shae" element={<ShaeTest />} /> */}
      {/* <Route path="/calendar" element={<Calendar />} /> */}
    </Routes>
    
  );
}

export default App;




