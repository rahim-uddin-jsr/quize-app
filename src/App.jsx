import { useEffect, useState } from "react";
import Start from "./Components/Start/Start";
import Suspended from "./Components/Suspended/Suspended";

const App = () => {
  const [quizData, setQuizData] = useState([]);
  const [quizStart, setQuizStart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [keyPress, setKeyPress] = useState(false);
  const [printScreen, setPrintScreen] = useState(false);
  const [control, setControl] = useState(false);
  const [suspended, setSuspended] = useState(false);
  document.addEventListener("keydown", () => {
    setKeyPress(true);
  });
  document.addEventListener("keyup", () => {
    setKeyPress(true);
  });
  document.addEventListener("keypress", () => {
    setKeyPress(true);
  });
  // Attach the keydown event listener when the component mounts
  useEffect(() => {
    fetch("https://quiz-app-blond-one.vercel.app/questions")
      .then((res) => res.json())
      .then((data) => setQuizData(data));

    const handleKeyDown = (event) => {
      const keyPressed = event.key;
      if (keyPressed === "PrintScreen") {
        setPrintScreen(true);
        console.log(11);
      }
      if (keyPressed === "Control") {
        setControl(true);
        console.log(12);
      }
    };
    const handleKeyUp = (event) => {
      const keyPressed = event.key;
      if (keyPressed === "PrintScreen") {
        setPrintScreen(true);
        console.log(11);
      }
      if (keyPressed === "Control") {
        setControl(true);
      }
    };

    document.addEventListener("keyup", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    if (control && printScreen) {
      setCurrentQuestion(() => quizData.length);
      setControl(false);
      setPrintScreen(false);
    }
    console.log({ control, printScreen });

    if (suspended) {
      setCurrentQuestion(() => quizData.length);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyPress, control, printScreen, suspended]);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      setSuspended(true);
      console.log("true");
    } else {
      setSuspended(false);
    }
  });
  const handleAnswerSelection = (selectedOption) => {
    setSelectedAnswer(selectedOption);
  };

  const handleNextQuestion = () => {
    const isAnswerCorrect =
      selectedAnswer === quizData[currentQuestion].correctAnswer;

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedAnswer(null);
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleMouseLeave = (event) => {
    console.log(event);
    setCurrentQuestion(() => quizData.length);
  };

  const handleRestartQuiz = () => {
    console.log("clicked");
    setSuspended(false);
    setCurrentQuestion(0);
  };
  const handleQuizStart = () => {
    setQuizStart(true);
    setCurrentQuestion(0);
  };
  return (
    <>
      {!quizStart ? (
        <Start handleQuizStart={handleQuizStart} />
      ) : (
        <>
          {suspended ? (
            <Suspended handleRestartQuiz={handleRestartQuiz} />
          ) : (
            <div
              onMouseLeave={handleMouseLeave}
              className="mx-auto p-4 w-[95%] bg-blue-300  min-h-screen"
            >
              {currentQuestion < quizData.length ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Question {currentQuestion + 1}
                  </h2>
                  <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-4">
                      {quizData[currentQuestion]?.question}
                    </h2>
                    <ul>
                      {quizData[currentQuestion]?.options.map(
                        (option, index) => (
                          <li key={index} className="mb-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value={option}
                                checked={selectedAnswer === option}
                                onChange={() => handleAnswerSelection(option)}
                                className="mr-2"
                              />
                              {option}
                            </label>
                          </li>
                        )
                      )}
                    </ul>
                    <button
                      onClick={handleNextQuestion}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Quiz Completed</h2>
                  <p className="text-xl">Your Score: {score}</p>
                  <button
                    onClick={handleRestartQuiz}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Restart
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default App;
