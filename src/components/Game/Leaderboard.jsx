export default function Leaderboard({ items }){
  return (
    <div className="mt-6 p-4 bg-white/5 rounded-lg">
      <h3 className="font-semibold mb-2">Leaderboard (Local)</h3>
      {items.length === 0 ? (
        <div className="text-sm text-gray-300">No records yet.</div>
      ) : (
        <ol className="list-decimal pl-5">
          {items.map((it, idx) => (
            <li key={idx} className="text-sm">
              {it.name || 'Player'} — <span className="font-semibold">{it.score} ms</span>
              <span className="text-xs text-gray-400"> ({it.date})</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
