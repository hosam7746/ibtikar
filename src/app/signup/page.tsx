'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      setMsg(`❌ خطأ: ${error.message}`)
    } else {
      setMsg('✅ تم إنشاء الحساب، تحقق من بريدك الإلكتروني للتأكيد.')
      console.log(data)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>إنشاء حساب</h1>
      <form onSubmit={handleSignUp}>
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
        <button type="submit">تسجيل</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
