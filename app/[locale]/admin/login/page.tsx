import type { Metadata } from 'next'
import { AdminLogin } from '@/components/admin/admin-login'

export const metadata: Metadata = {
  title: 'Admin sign in | Francisco Trianto',
  robots: { index: false, follow: false, noarchive: true },
}

export default function AdminLoginPage() {
  return <AdminLogin />
}
