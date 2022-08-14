
import Calendar from "./components/calendar/Calendar";

import "./App.css";
import Home from "./components/login/Home";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route  exact path="/" element={<Home />} />

      <Route path="/shae" element={<ShaeTest />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
    
  );
}

export default App;




