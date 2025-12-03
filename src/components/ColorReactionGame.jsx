import { useState, useRef, useEffect } from "react";

export default function ColorReactionGame() {
  const [status, setStatus] = useState("idle"); // idle | countdown | waiting | ready | clicked
  const [message, setMessage] = useState("Click START to begin!");
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(
    () => localStorage.getItem("bestTime") || null
  );

  const [difficulty, setDifficulty] = useState("easy");
  const [countdown, setCountdown] = useState(3);

  const timerRef = useRef(null);
  const startTime = useRef(null);

  // Save in localStorage
  useEffect(() => {
    if (bestTime) {
      localStorage.setItem("bestTime", bestTime);
    }
  }, [bestTime]);

  // Difficulty delay range
  const delayByDifficulty = {
    easy: [1000, 3000],
    medium: [1000, 5000],
    hard: [1000, 7000],
  };

  // Play small sound effect
  const playSound = (tone) => {
    const audio = new Audio(tone);
    audio.volume = 0.3;
    audio.play();
  };

  const startGame = () => {
    setStatus("countdown");
    setCountdown(3);
    setMessage("Get Ready...");
    setReactionTime(null);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          initiateWaitPhase();
          return 1;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const initiateWaitPhase = () => {
    setStatus("waiting");
    setMessage("Wait for GREEN...");

    const [minDelay, maxDelay] = delayByDifficulty[difficulty];
    const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;

    timerRef.current = setTimeout(() => {
      setStatus("ready");
      setMessage("CLICK NOW!");
      startTime.current = Date.now();
      playSound("/ready.wav");
    }, randomDelay);
  };

  const handleClick = () => {
    if (status === "waiting") {
      playSound("/fail.wav");
      setMessage("Too early! ❌");
      clearTimeout(timerRef.current);
      setStatus("idle");
      return;
    }

    if (status === "ready") {
      const time = Date.now() - startTime.current;
      playSound("/click.wav");

      setReactionTime(time);
      setStatus("clicked");
      setMessage(`Your time: ${time} ms`);

      if (!bestTime || time < bestTime) {
        setBestTime(time);
      }
    }
  };

  const resetGame = () => {
    clearTimeout(timerRef.current);
    setStatus("idle");
    setMessage("Click START to begin!");
    setReactionTime(null);
  };

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Advanced Reaction Game ⚡</h1>

      <div className="mb-4">
        <label className="mr-3 font-medium">Difficulty:</label>
        <select
          className="bg-gray-700 px-3 py-2 rounded-lg"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div
        onClick={handleClick}
        className={`w-72 h-72 rounded-xl flex items-center justify-center text-xl font-semibold cursor-pointer transition-all duration-300 
          ${
            status === "ready"
              ? "bg-green-500 animate-pulse text-black"
              : status === "waiting"
              ? "bg-red-500"
              : status === "countdown"
              ? "bg-blue-500"
              : "bg-gray-700"
          }
        `}
      >
        {status === "countdown" ? `Starting in: ${countdown}` : message}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={startGame}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
        >
          START
        </button>

        <button
          onClick={resetGame}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg"
        >
          RESET
        </button>
      </div>

      {bestTime && (
        <p className="mt-4 text-lg text-yellow-300">
          🏆 Best Time: <span className="font-bold">{bestTime} ms</span>
        </p>
      )}
    </div>
  );
}
