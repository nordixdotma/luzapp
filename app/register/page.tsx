import type { Metadata } from "next"
import Link from "next/link"

import { AuthLayout } from "@/components/auth/auth-layout"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register | Luz",
  description: "Create your admin account and company profile",
}

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your Luz account 👋"
      subtitle="Register as an administrator to access your dashboard"
    >
      <RegisterForm />
      <div className="mt-2 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary underline underline-offset-4">
          Login
        </Link>
      </div>
    </AuthLayout>
  )
}
