import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";

export default function ColorReactionGame() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("Click START to begin!");
  const [reactionTime, setReactionTime] = useState(null);

  const [bestTime, setBestTime] = useState(
    () => Number(localStorage.getItem("bestTime")) || null
  );

  const [leaderboard, setLeaderboard] = useState(
    () => JSON.parse(localStorage.getItem("leaderboard")) || []
  );

  const [difficulty, setDifficulty] = useState("easy");
  const [countdown, setCountdown] = useState(3);

  const [roundMode, setRoundMode] = useState(false);
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);

  const [theme, setTheme] = useState("dark");
  const [shape, setShape] = useState("square");

  const timerRef = useRef(null);
  const startTime = useRef(null);

  const delayByDifficulty = {
    easy: [1000, 3000],
    medium: [1000, 5000],
    hard: [1000, 7000],
  };

  // Save best time + leaderboard
  useEffect(() => {
    if (bestTime) {
      localStorage.setItem("bestTime", bestTime);
    }
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }, [bestTime, leaderboard]);

  const randomShape = () => {
    const shapes = ["square", "circle", "diamond"];
    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  const startGame = () => {
    setStatus("countdown");
    setCountdown(3);
    setMessage("Get Ready...");
    setReactionTime(null);

    setShape(randomShape());

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

      if (navigator.vibrate) navigator.vibrate(150);
    }, randomDelay);
  };

  const handleClick = () => {
    if (status === "waiting") {
      setMessage("Too early! ❌");
      navigator.vibrate?.(200);
      clearTimeout(timerRef.current);
      setStatus("idle");
      return;
    }

    if (status === "ready") {
      const time = Date.now() - startTime.current;

      setReactionTime(time);
      setStatus("clicked");
      setMessage(`Your time: ${time} ms`);

      navigator.vibrate?.(100);

      // Confetti if best beaten
      if (!bestTime || time < bestTime) {
        confetti({
          particleCount: 80,
          spread: 60,
        });
        setBestTime(time);
      }

      // Update leaderboard (top 5)
      const updatedBoard = [...leaderboard, time]
        .sort((a, b) => a - b)
        .slice(0, 5);

      setLeaderboard(updatedBoard);

      // Round mode logic
      if (roundMode) {
        setRounds((prev) => [...prev, time]);

        if (currentRound < 10) {
          setCurrentRound((r) => r + 1);
          setTimeout(startGame, 1200);
        } else {
          setStatus("summary");
        }
      }
    }
  };

  const start10RoundChallenge = () => {
    setRounds([]);
    setCurrentRound(1);
    setRoundMode(true);
    startGame();
  };

  const resetGame = () => {
    clearTimeout(timerRef.current);
    setStatus("idle");
    setMessage("Click START to begin!");
    setReactionTime(null);
    setRoundMode(false);
    setRounds([]);
    setCurrentRound(1);
  };

  const avg =
    rounds.length > 0
      ? Math.round(rounds.reduce((a, b) => a + b, 0) / rounds.length)
      : 0;

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center py-10 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Ultra Reaction Game ⚡</h1>

      {/* Theme Toggle */}
      <button
        className="mb-4 px-4 py-2 bg-purple-500 rounded-lg"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Toggle {theme === "dark" ? "Light" : "Dark"} Mode
      </button>

      {/* Difficulty */}
      <select
        className="mb-4 bg-gray-700 px-3 py-2 rounded-lg"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      {/* Shape */}
      <p className="mb-2">Next Shape: {shape}</p>

      {/* GAME BOX */}
      <div
        onClick={handleClick}
        className={`w-72 h-72 flex items-center justify-center text-xl font-semibold cursor-pointer transition-all duration-300
          ${
            status === "ready"
              ? "bg-green-500 animate-pulse text-black"
              : status === "waiting"
              ? "bg-red-500"
              : status === "countdown"
              ? "bg-blue-500"
              : "bg-gray-700"
          }
          ${
            shape === "circle"
              ? "rounded-full"
              : shape === "diamond"
              ? "rotate-45 rounded-none"
              : "rounded-xl"
          }
        `}
      >
        {status === "countdown" ? `Starting in: ${countdown}` : message}
      </div>

      {/* Buttons */}
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

        <button
          onClick={start10RoundChallenge}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
        >
          10-Round Mode
        </button>
      </div>

      {/* Stats */}
      {bestTime && (
        <p className="mt-4 text-lg text-yellow-400">
          🏆 Best Time Ever: {bestTime} ms
        </p>
      )}

      {/* Leaderboard */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">🏆 Leaderboard</h2>
        {leaderboard.map((t, i) => (
          <p key={i}>
            #{i + 1}: {t} ms
          </p>
        ))}
      </div>

      {/* Round Summary */}
      {status === "summary" && (
        <div className="mt-8 bg-gray-800 p-6 rounded-xl w-80 text-center">
          <h2 className="text-2xl font-bold mb-3">10-Round Summary</h2>
          <p>Average Time: {avg} ms</p>
          <p>Best Round: {Math.min(...rounds)} ms</p>
          <p>Worst Round: {Math.max(...rounds)} ms</p>

          {/* Graph */}
          <div className="mt-4">
            <p className="mb-2 font-semibold">Round Performance</p>
            <div className="flex gap-2 items-end">
              {rounds.map((t, i) => (
                <div
                  key={i}
                  className="bg-blue-400 w-4"
                  style={{ height: `${t / 3}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
