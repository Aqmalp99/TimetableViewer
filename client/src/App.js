import "./App.css";
import ShaeTest from "./components/ShaeTest/ShaeTest";
import Login from "./components/login/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/shae" element={<ShaeTest />} />
    </Routes>
  );
}

export default App;
