import React from "react";
import "./App.css"; // Import the CSS file for styling
import Quiz from "./components/quiz.js";
import Footer from "./components/footer.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Quizzy Brain</h1>
      </header>
      <Quiz />
      <Footer />
    </div>
  );
}

export default App;
