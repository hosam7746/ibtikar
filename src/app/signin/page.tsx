'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      setMsg(`❌ خطأ: ${error.message}`)
    } else {
      setMsg('✅ تم تسجيل الدخول بنجاح')
      console.log(data)
      window.location.href = '/dashboard'
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>تسجيل الدخول</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">دخول</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
