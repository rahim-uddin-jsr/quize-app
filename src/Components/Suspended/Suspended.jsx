const Suspended = ({ handleRestartQuiz }) => {
  return (
    <div className="text-center flex flex-col justify-center items-center w-screen min-h-screen bg-red-300">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Opps! You are suspended try again later
      </h2>
      <button
        onClick={() => handleRestartQuiz()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Restart
      </button>
    </div>
  );
};

export default Suspended;
