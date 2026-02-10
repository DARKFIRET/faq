import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Postgre from "./pages/Postgre";
import Form from "./pages/Form";
import Data from "./pages/Data";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Postgre />} />
        <Route path="/#/form" element={<Form />} />
        <Route path="/#/response" element={<Data />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
