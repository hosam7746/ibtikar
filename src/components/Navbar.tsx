
'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Navbar(){
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<string | null>(null)

  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>{
      setUser(data.user)
      setRole(data.user?.user_metadata?.role ?? null)
    })
  }, [])

  const signOut = async ()=>{
    await supabase.auth.signOut()
    location.href = '/'
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center gap-3">
        <button className="px-2 py-1 border rounded">☰</button>
        <Link href="/" className="font-bold">ابتكار</Link>
        <nav className="ms-auto flex items-center gap-3">
          <Link href="/learn">تعلّم</Link>
          <Link href="/exercises">تمارين</Link>
          <Link href="/community">مجتمع</Link>
          {user ? (
            <>
              {role && <Link href={`/dashboard/${role}`}>لوحتي</Link>}
              <button onClick={signOut} className="px-3 py-1 border rounded">خروج</button>
            </>
          ):(
            <>
              <Link href="/signin" className="px-3 py-1 border rounded">دخول</Link>
              <Link href="/signup" className="px-3 py-1 border rounded">إنشاء حساب</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
