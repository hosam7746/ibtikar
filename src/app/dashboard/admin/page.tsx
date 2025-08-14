
'use client'
import RoleGuard from '@/components/RoleGuard'
import {useEffect,useState} from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AdminDashboard() {
  return (
    <RoleGuard role="admin">
      <section className="card">
        <h1 className="text-2xl font-bold mb-2">مرحبًا فريق الإدارة 🛠️</h1>
        <p>هذه لوحة تحكم الإدارة.</p>
      </section>
    </RoleGuard>
  )
}
