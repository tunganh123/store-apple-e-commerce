import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Addproduct from "./page/Addproduct";
import Editproduct from "./page/Editproduct";
import Listproduct from "./page/Listproduct";
import Login from "./page/Login";
import Livechat from "./page/Livechat";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route path="/livechat" element={<Livechat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/listproduct" element={<Listproduct />} />
        <Route path="/editproduct/:idproduct" element={<Editproduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
