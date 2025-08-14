
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function RoleGuard({ role, children }:{ role: 'student'|'parent'|'teacher'|'admin', children: React.ReactNode }){
  const router = useRouter()
  const [allowed, setAllowed] = useState<boolean | null>(null)

  useEffect(()=>{
    supabase.auth.getUser().then(({ data })=>{
      const r = data.user?.user_metadata?.role
      setAllowed(r === role)
      if (r !== role) router.push('/signin')
    })
  },[role, router])

  if (allowed === null) return null
  if (!allowed) return null
  return <>{children}</>
}
