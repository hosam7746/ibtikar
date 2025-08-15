'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student') // الدور الذي يختاره المستخدم
  const [msg, setMsg] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    // تسجيل الدخول في Supabase
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (loginError) {
      setMsg(❌ خطأ: ${loginError.message})
      return
    }

    const userId = loginData.user?.id
    if (!userId) {
      setMsg('❌ لم يتم العثور على بيانات المستخدم')
      return
    }

    let tableName = ''
    if (role === 'student') tableName = 'students'
    if (role === 'teacher') tableName = 'teachers'
    if (role === 'parent') tableName = 'parents'

    // التحقق من أن المستخدم موجود في الجدول الذي يخص دوره
    const { data: roleData, error: roleError } = await supabase
      .from(tableName)
      .select('id')
      .eq('user_id', userId)
      .single()

    if (roleError || !roleData) {
      setMsg(❌ هذا الحساب غير مسجل كـ ${role === 'student' ? 'طالب' : role === 'teacher' ? 'معلم' : 'ولي أمر'})
      return
    }

    setMsg(✅ تم تسجيل الدخول كـ ${role === 'student' ? 'طالب' : role === 'teacher' ? 'معلم' : 'ولي أمر'})

    // التوجيه حسب الدور
    if (role === 'student') {
      window.location.href = '/student-dashboard'
    } else if (role === 'teacher') {
      window.location.href = '/teacher-dashboard'
    } else {
      window.location.href = '/parent-dashboard'
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

        {/* اختيار الدور */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">طالب</option>
          <option value="teacher">معلم</option>
          <option value="parent">ولي أمر</option>
        </select><br />

        <button type="submit">دخول</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
