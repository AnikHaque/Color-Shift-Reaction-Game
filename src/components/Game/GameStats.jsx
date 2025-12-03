export default function GameStats({ score, combo, timeLeft, bestTime }){
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-4">
      <div className="p-3 bg-white/5 rounded-lg text-center">
        <div className="text-sm text-gray-300">Score</div>
        <div className="text-xl font-bold">{score}</div>
      </div>

      <div className="p-3 bg-white/5 rounded-lg text-center">
        <div className="text-sm text-gray-300">Combo</div>
        <div className="text-xl font-bold">{combo}</div>
      </div>

      <div className="p-3 bg-white/5 rounded-lg text-center">
        <div className="text-sm text-gray-300">Time Left</div>
        <div className="text-xl font-bold">{timeLeft}s</div>
      </div>

      <div className="p-3 bg-white/5 rounded-lg text-center">
        <div className="text-sm text-gray-300">Best</div>
        <div className="text-xl font-bold">{bestTime ? `${bestTime} ms` : '--'}</div>
      </div>
    </div>
  )
}
