import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Quiz.css"; // Import the CSS file for styling

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [showScore, setShowScore] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    import("./quizQuestions.json")
      .then((data) => {
        console.log("Loaded questions:", data.default);
        const shuffledQuestions = shuffleArray(data.default);
        const questionsPerRound = 10;
        const roundQuestions = shuffledQuestions.slice(
          (round - 1) * questionsPerRound,
          round * questionsPerRound
        );
        setQuestions(roundQuestions);
      })
      .catch((error) => console.error("Error importing questions:", error));
  }, [round]);

  const startNextRound = () => {
    if (round < 5) {
      setRound(round + 1);
      setScore(0);
      setCurrentQuestion(0);
      setShowScore(false);
      setUserAnswer(null); // Reset user's answer
    } else {
      setShowScore(true);
      setFinalScore(score);
    }
  };

  const handleAnswerClick = (selectedAnswer) => {
    const isCorrect =
      selectedAnswer === questions[currentQuestion]?.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setUserAnswer(selectedAnswer);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length && nextQuestion < round * 10) {
      setCurrentQuestion(nextQuestion);
    } else {
      if (round < 5) {
        if (score >= 5) {
          startNextRound();
        } else {
          setShowScore(true);
          setFinalScore(score);
        }
      } else {
        setShowScore(true);
        setFinalScore(score);
      }
    }
  };

  return (
    <div className="quiz-container">
      {quizStarted ? (
        <div>
          <h2 className="quiz-title">
            Round {round}
            <br />
            <br />
            Question {currentQuestion + 1}/10
          </h2>
          {questions[currentQuestion] ? (
            <div className="question-container">
              <p className="question-text">
                {questions[currentQuestion].question}
              </p>
              <div className="options-container">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    className={`option-button ${
                      userAnswer === option
                        ? userAnswer ===
                          questions[currentQuestion].correctAnswer
                          ? "correct"
                          : "incorrect"
                        : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <p className="score-text">Your Current Score: {score}/10</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      ) : (
        <div className="instructions">
          <h1 className="quiz-title">Welcome to the Quiz!</h1>
          <p className="quiz-description">
            Test your knowledge with these trivia questions.
          </p>
          <div className="instructions-details">
            <h2>Instructions:</h2>
            <ul className="instruction-list">
              <li className="instruction-item">
                You have a total of 5 rounds, with 10 questions per round.
              </li>
              <li className="instruction-item">
                Click on an answer to select it.
              </li>
              <li className="instruction-item">
                Each correct answer earns you 1 point.
              </li>
              <li className="instruction-item">
                You must score at least 5 points to progress to the next round.
              </li>
            </ul>
          </div>
          <button className="start-button" onClick={() => setQuizStarted(true)}>
            Start Quiz
          </button>
        </div>
      )}
      {showScore && (
        <div className="score-container">
          <h2 className="quiz-title">
            Your Score for Round {round}: {score}/10
          </h2>
          {round < 5 ? (
            <>
              {score >= 5 ? (
                <button className="next-button" onClick={startNextRound}>
                  Start Round {round + 1}
                </button>
              ) : (
                <p className="message">
                  You didn't score enough to progress to the next round.
                </p>
              )}
            </>
          ) : (
            <>
              <p className="message">End of the quiz</p>
              <p className="final-score-text">Final Score: {finalScore}/50</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Quiz;
