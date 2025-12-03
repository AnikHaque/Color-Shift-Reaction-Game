export function playSound(src, mute){
  if(mute) return
  try{
    const a = new Audio(src)
    a.volume = 0.25
    a.play()
  }catch(e){}
}
