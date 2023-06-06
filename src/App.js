import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useContext, createContext, useState } from "react";
import React from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Store from "./components/store";
import About from "./components/about";
import Contact from "./components/contact";
import Login from "./components/login";
import Faq from "./components/faq";

const Error = () => {
  return (
    <div>
      <h1>Page not Found</h1>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="faq" element={<Faq />} />
          <Route path="store/:category/:title" element={<Store />}></Route>
          <Route path="/store/:category" element={<Store />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
