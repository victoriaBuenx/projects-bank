"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "./sidebar"
import { TopBar } from "./top-bar"

interface DashboardLayoutProps {
  children: ReactNode
  userRole?: "admin" | "tutor" | "student"
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const [user, setUser] = useState<{
    name: string
    email: string
    role: "admin" | "tutor" | "student"
  } | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      router.push("/")
      return
    }

    const name = localStorage.getItem("userName") || "Usuario"
    const email = localStorage.getItem("userEmail") || ""
    const rawRole = (localStorage.getItem("userRole") || "admin").toLowerCase()

    // Map backend roles to frontend role keys
    const roleMap: Record<string, "admin" | "tutor" | "student"> = {
      admin: "admin",
      tutor: "tutor",
      student: "student",
      user: "admin",
    }
    const role = roleMap[rawRole] || "admin"

    setUser({ name, email, role })
  }, [router])

  // Show nothing while checking auth
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole={user.role} />
      <div className="pl-64 transition-all duration-300">
        <TopBar user={user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
