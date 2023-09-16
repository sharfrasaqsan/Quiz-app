// src/App.js
import React from "react";
import "./App.css";
import Quiz from "./components/quiz.js"; // Update the import path

function App() {
  return (
    <div className="App">
      <h1>Quiz App</h1>
      <Quiz />
    </div>
  );
}

export default App;
