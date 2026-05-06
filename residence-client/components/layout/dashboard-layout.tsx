"use client"

import { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { TopBar } from "./top-bar"

interface DashboardLayoutProps {
  children: ReactNode
  userRole?: "admin" | "tutor" | "student"
}

export function DashboardLayout({ children, userRole = "admin" }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole={userRole} />
      <div className="pl-64 transition-all duration-300">
        <TopBar
          user={{
            name: "Carlos García",
            email: "carlos.garcia@universidad.edu",
            role: userRole,
          }}
        />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
