export default function DifficultySelector({ difficulty, setDifficulty }){
  return (
    <div className="flex items-center gap-2 mb-3">
      {['easy','medium','hard'].map(d => (
        <button
          key={d}
          onClick={() => setDifficulty(d)}
          className={`px-3 py-1 rounded ${difficulty===d ? 'bg-green-500' : 'bg-white/5'}`}
        >
          {d.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
