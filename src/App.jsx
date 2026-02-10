import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Postgre from "./pages/Postgre";
import Form from "./pages/Form";
import Data from "./pages/Data";
import "./App.css";
import Register from "./pages/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Postgre />} />
        <Route path="/form" element={<Form />} />
        <Route path="/response" element={<Data />} />
        <Route path="/reg" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
