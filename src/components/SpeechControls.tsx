
'use client'
export default function SpeechControls(){
  const speak = ()=>{
    const sel = window.getSelection()?.toString()
    const text = sel && sel.trim().length ? sel : document.body.innerText.slice(0, 400)
    if (!text) return
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ar'
    speechSynthesis.cancel(); speechSynthesis.speak(u)
  }
  const record = ()=>{
    const SR:any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (!SR) { alert('التعرّف على الصوت غير مدعوم'); return }
    const rec = new SR()
    rec.lang = 'ar'; rec.onresult = (e:any)=> alert('نص صوتي: '+ e.results[0][0].transcript)
    rec.start()
  }
  return (
    <div className="fixed bottom-4 end-4 flex gap-2">
      <button onClick={speak} className="px-3 py-2 border rounded">🔊</button>
      <button onClick={record} className="px-3 py-2 border rounded">🎙️</button>
    </div>
  )
}
