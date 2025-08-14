
'use client'
import RoleGuard from '@/components/RoleGuard'
import {useEffect,useState} from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function TeacherDashboard() {
  return (
    <RoleGuard role="teacher">
      <section className="card">
        <h1 className="text-2xl font-bold mb-2">مرحبًا أيها المعلم/الأخصائي 🎓</h1>
        <p>هذه لوحة تحكم المعلم.</p>
      </section>
    </RoleGuard>
  )
}
