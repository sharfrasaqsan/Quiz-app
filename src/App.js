import React from "react";
import "./App.css"; // Import the CSS file for styling
import Quiz from "./components/quiz.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Quizzy Brain</h1>
      </header>
      <Quiz />
    </div>
  );
}

export default App;
