
import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="card">
      <h1 className="text-2xl font-bold mb-2">مرحبًا 👋</h1>
      <p className="mb-4">ابدأ بتجربة المنصة حسب دورك أو أنشئ حسابًا جديدًا.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Link className="big-btn" href="/dashboard/student">لوحة الطالب</Link>
        <Link className="big-btn" href="/dashboard/parent">لوحة ولي الأمر</Link>
        <Link className="big-btn" href="/dashboard/teacher">لوحة المعلم/الأخصائي</Link>
        <Link className="big-btn" href="/dashboard/admin">لوحة الإدارة</Link>
      </div>
      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        <Link className="big-btn" href="/learn">تعلّم</Link>
        <Link className="big-btn" href="/exercises">تمارين حسية</Link>
        <Link className="big-btn" href="/community">مجتمع</Link>
      </div>
    </section>
  )
}
