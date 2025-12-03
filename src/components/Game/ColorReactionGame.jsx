import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'

import GameHeader from './GameHeader'
import GameStats from './GameStats'
import Leaderboard from './Leaderboard'
import DifficultySelector from './DifficultySelector'
import useLocalStorage from '../../hooks/useLocalStorage'
import { playSound } from '../../utils/sound'
import Button from '../UI/Button'

const delayByDifficulty = {
  easy: [800, 2200],
  medium: [900, 3500],
  hard: [900, 5200]
}

const shapes = ['square','circle','diamond']

export default function ColorReactionGame(){
  // UI
  const [theme, setTheme] = useState('dark')
  const [mute, setMute] = useState(false)

  // game
  const [status, setStatus] = useState('idle') // idle | countdown | waiting | ready | clicked | paused
  const [message, setMessage] = useState('Click START to begin')
  const [countdown, setCountdown] = useState(3)
  const [shape, setShape] = useState('square')

  const [difficulty, setDifficulty] = useState('easy')
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [bestTime, setBestTime] = useLocalStorage('bestTime', null)
  const [leaderboard, setLeaderboard] = useLocalStorage('leaderboard', [])

  // session
  const [timeLeft, setTimeLeft] = useState(30)
  const [running, setRunning] = useState(false)

  // refs
  const startRef = useRef(null)
  const timerRef = useRef(null)
  const countdownRef = useRef(null)

  useEffect(() => {
    if(theme === 'dark') document.documentElement.classList.remove('light')
    else document.documentElement.classList.add('light')
  }, [theme])

  // Timer for the session
  useEffect(() => {
    if(!running) return
    if(timeLeft <= 0){
      endSession()
      return
    }
    const id = setInterval(() => setTimeLeft(t => t-1), 1000)
    return () => clearInterval(id)
  }, [running, timeLeft])

  function startSession(){
    setScore(0); setCombo(0); setTimeLeft(30); setRunning(true)
    startGameOnce()
  }

  function endSession(){
    setRunning(false)
    setStatus('idle')
    setMessage('Session ended — view summary')
    // additional summary handling can be added
  }

  function startGameOnce(){
    setStatus('countdown'); setCountdown(3); setMessage('Get ready...')
    setShape(shapes[Math.floor(Math.random()*shapes.length)])

    let step = 3
    countdownRef.current = setInterval(() => {
      step -= 1
      setCountdown(step)
      if(step <= 0){
        clearInterval(countdownRef.current)
        initiateWaitPhase()
      }
    }, 1000)
  }

  function initiateWaitPhase(){
    setStatus('waiting'); setMessage('Wait for GREEN...')
    const [min, max] = delayByDifficulty[difficulty]
    const delay = Math.random()*(max-min)+min
    timerRef.current = setTimeout(() => {
      setStatus('ready'); setMessage('CLICK NOW!')
      startRef.current = Date.now()
      if(navigator.vibrate) navigator.vibrate(120)
      playSound('/ready.wav', mute)
    }, delay)
  }

  function handlePanelClick(){
    if(status === 'waiting'){
      // too early
      clearTimeout(timerRef.current)
      setMessage('Too early!')
      setCombo(0)
      playSound('/fail.wav', mute)
      setScore(s => Math.max(0, s-5))
      setStatus('idle')
      return
    }

    if(status === 'ready'){
      const t = Date.now() - startRef.current
      setMessage(`Nice! ${t} ms`)
      setStatus('clicked')
      playSound('/click.wav', mute)
      setCombo(c => c+1)

      const points = Math.max(1, Math.round(1000 / t)) * (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.2 : 1.5)
      setScore(s => Math.round(s + points))

      // best time
      if(!bestTime || t < bestTime){
        setBestTime(t)
        try {
          confetti({ particleCount: 60, spread: 60 })
        } catch(e){}
      }

      // quick next round
      setTimeout(() => {
        if(running){
          setShape(shapes[Math.floor(Math.random()*shapes.length)])
          startGameOnce()
        } else {
          setStatus('idle')
        }
      }, 700)
    }
  }

  function handleStart(){
    if(!running) startSession()
    else startGameOnce()
  }

  function saveScoreToLeaderboard(name){
    const entry = { name: name || 'Player', score: bestTime || 0, date: new Date().toLocaleDateString() }
    const updated = [...leaderboard, entry].slice(-10)
    setLeaderboard(updated)
  }

  function pauseResume(){
    if(status === 'paused'){
      setStatus('idle'); setRunning(true)
    } else {
      setStatus('paused'); setRunning(false)
    }
  }

  return (
    <div className={`p-6 rounded-xl shadow-2xl ${theme==='dark' ? 'bg-slate-800/60' : 'bg-white/80 text-black'}`}>

      <GameHeader theme={theme} setTheme={setTheme} mute={mute} setMute={setMute} />

      <GameStats score={score} combo={combo} timeLeft={timeLeft} bestTime={bestTime} />

      <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div
            role="button"
            onClick={handlePanelClick}
            className={`mx-auto w-72 h-72 flex items-center justify-center text-xl font-bold select-none cursor-pointer transition-all duration-200 ${status==='ready' ? 'bg-green-400 text-black animate-pulse' : status==='waiting' ? 'bg-red-500' : 'bg-gray-700 text-white'} ${shape==='circle' ? 'rounded-full' : shape==='diamond' ? 'rotate-45' : 'rounded-xl'}`}
            aria-pressed={status==='ready'}
          >
            {status==='countdown' ? `Starting in ${countdown}` : message}
          </div>

          <div className="mt-4 flex gap-3">
            <Button className="bg-blue-600" onClick={handleStart}>{running ? 'Next' : 'Start'}</Button>
            <Button className="bg-gray-500" onClick={() => { setStatus('idle'); setRunning(false); setMessage('Click START to begin') }}>Reset</Button>
            <Button className="bg-yellow-500" onClick={pauseResume}>{status==='paused' ? 'Resume' : 'Pause'}</Button>
          </div>

        </div>

        <div className="w-80">
          <div className="p-4 bg-white/5 rounded-lg">
            <h3 className="font-semibold mb-2">Session</h3>
            <p className="text-sm text-gray-300 mb-2">Score: <span className="font-bold">{score}</span></p>
            <p className="text-sm text-gray-300 mb-2">Combo: <span className="font-bold">{combo}</span></p>
            <p className="text-sm text-gray-300 mb-2">Best Time: <span className="font-bold">{bestTime ? `${bestTime} ms` : '--'}</span></p>

            <div className="mt-3">
              <h4 className="font-semibold mb-1">Leaderboard</h4>
              <Leaderboard items={leaderboard} />
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Quick Controls</h4>
              <div className="flex gap-2">
                <Button className="bg-indigo-600" onClick={() => saveScoreToLeaderboard()}>Save Best</Button>
                <Button className="bg-red-600" onClick={() => { localStorage.removeItem('leaderboard'); setLeaderboard([]) }}>Clear Board</Button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
