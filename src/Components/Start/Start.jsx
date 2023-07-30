const Start = ({ handleQuizStart }) => {
  return (
    <div>
      <div className="text-center flex flex-col justify-center items-center w-screen min-h-screen bg-blue-300">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Welcome to Quiz App
        </h2>
        <button
          onClick={() => handleQuizStart()}
          className="mt-4 px-4 py-2 bg-bla-500 bg-white rounded"
        >
          Start Now
        </button>
      </div>
    </div>
  );
};

export default Start;
