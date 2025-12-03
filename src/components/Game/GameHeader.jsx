import Button from '../UI/Button'

export default function GameHeader({ theme, setTheme, mute, setMute }){
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold">⚡ Ultra Reaction</h1>
        <p className="text-sm text-gray-300">Test your reflexes — beat your best!</p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          className="bg-white/10"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </Button>

        <Button className="bg-white/10" onClick={() => setMute(!mute)}>
          {mute ? 'Unmute' : 'Mute'}
        </Button>
      </div>
    </div>
  )
}
