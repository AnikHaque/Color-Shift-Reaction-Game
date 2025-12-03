import { useState } from 'react'

export default function useLocalStorage(key, initial){
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch(e) {
      return initial
    }
  })

  const setLS = (val) => {
    setState(val)
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch(e){}
  }

  return [state, setLS]
}
