
'use client'
import RoleGuard from '@/components/RoleGuard'
import {useEffect,useState} from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ParentDashboard() {
  return (
    <RoleGuard role="parent">
      <section className="card">
        <h1 className="text-2xl font-bold mb-2">مرحبًا يا ولي الأمر 🤝</h1>
        <p>هذه لوحة تحكم ولي الأمر.</p>
      </section>
    </RoleGuard>
  )
}
