
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = { title: 'ابتكار – منصة تعليمية', description: 'تحسين جودة التعلم للمعالين' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-6 flex-1">{children}</main>
        <footer className="border-t py-4 text-center text-sm text-gray-500">© 2025 منصة ابتكار</footer>
      </body>
    </html>
  )
}
