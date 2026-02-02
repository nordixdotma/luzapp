import type { Metadata } from "next"
import Link from "next/link"

import { AuthLayout } from "@/components/auth/auth-layout"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login | Luz",
  description: "Log in to your Luz account",
}

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome to Luz" subtitle="Log in to your account to continue">
      <LoginForm />
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary underline underline-offset-4">
          Register
        </Link>
      </div>
    </AuthLayout>
  )
}
