
'use client'
import RoleGuard from '@/components/RoleGuard'
import {useEffect,useState} from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function StudentDashboard() {
  return (
    <RoleGuard role="student">
      <section className="card">
        <h1 className="text-2xl font-bold mb-2">مرحبًا أيها الطالب 🌟</h1>
        <p>هذه لوحة تحكم الطالب.</p>
      </section>
    </RoleGuard>
  )
}
