import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Drawing from "./Components/Drawing";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Drawing />
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
