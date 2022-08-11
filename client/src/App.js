
import Calendar from "./components/calendar/Calendar";

import "./App.css";
import ShaeTest from "./components/ShaeTest/ShaeTest";
import Login from "./components/login/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route  exact path="/" element={<Login />} />
      <Route path="/shae" element={<ShaeTest />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
    
  );
}

export default App;




