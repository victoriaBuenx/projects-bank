"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCard } from "@/components/ui/stats-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  FolderKanban,
  Building2,
  Users,
  FileCheck,
  Plus,
  ArrowRight,
  Calendar,
  Clock,
} from "lucide-react"
import Link from "next/link"

// Mock data
const stats = [
  {
    title: "Proyectos Activos",
    value: 24,
    icon: <FolderKanban className="h-6 w-6" />,
    trend: { value: 12, label: "vs mes anterior" },
  },
  {
    title: "Empresas Registradas",
    value: 48,
    icon: <Building2 className="h-6 w-6" />,
    trend: { value: 8, label: "vs mes anterior" },
  },
  {
    title: "Estudiantes Asignados",
    value: 156,
    icon: <Users className="h-6 w-6" />,
    trend: { value: 5, label: "vs mes anterior" },
  },
  {
    title: "Entregables Pendientes",
    value: 32,
    icon: <FileCheck className="h-6 w-6" />,
    trend: { value: -15, label: "vs semana anterior" },
  },
]

const recentProjects = [
  {
    id: "1",
    name: "Sistema de Gestión Hospitalaria",
    company: "MedTech Solutions",
    status: "active" as const,
    students: 3,
    dueDate: "2024-06-15",
  },
  {
    id: "2",
    name: "App de Delivery",
    company: "FastFood Corp",
    status: "in-progress" as const,
    students: 2,
    dueDate: "2024-05-30",
  },
  {
    id: "3",
    name: "Plataforma E-learning",
    company: "EduTech MX",
    status: "active" as const,
    students: 4,
    dueDate: "2024-07-01",
  },
  {
    id: "4",
    name: "Dashboard Financiero",
    company: "FinanceApp SA",
    status: "paused" as const,
    students: 2,
    dueDate: "2024-06-20",
  },
]

const pendingDeliverables = [
  {
    id: "1",
    name: "Reporte de Avance Semanal",
    student: "Ana Martínez",
    project: "Sistema de Gestión Hospitalaria",
    dueDate: "2024-04-15",
    status: "pending" as const,
  },
  {
    id: "2",
    name: "Documento de Especificación",
    student: "Carlos López",
    project: "App de Delivery",
    dueDate: "2024-04-12",
    status: "submitted" as const,
  },
  {
    id: "3",
    name: "Prototipo de UI",
    student: "María García",
    project: "Plataforma E-learning",
    dueDate: "2024-04-18",
    status: "pending" as const,
  },
]

const quickActions = [
  { label: "Nuevo Proyecto", icon: FolderKanban, href: "/dashboard/projects/new" },
  { label: "Nueva Empresa", icon: Building2, href: "/dashboard/companies/new" },
  { label: "Crear Entregable", icon: FileCheck, href: "/dashboard/deliverables/new" },
  { label: "Nueva Asignación", icon: Users, href: "/dashboard/assignments/new" },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Bienvenido, Carlos
            </h1>
            <p className="text-muted-foreground">
              Aquí tienes un resumen de la actividad del sistema.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date().toLocaleDateString("es-MX", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Projects */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Proyectos Recientes</CardTitle>
                <CardDescription>
                  Últimos proyectos registrados en el sistema
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/projects" className="gap-1">
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <FolderKanban className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {project.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {project.students}
                      </div>
                      <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {new Date(project.dueDate).toLocaleDateString("es-MX", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                      <StatusBadge status={project.status} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>
                  Atajos para tareas frecuentes
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="justify-start gap-3 h-12"
                    asChild
                  >
                    <Link href={action.href}>
                      <action.icon className="h-5 w-5 text-primary" />
                      {action.label}
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Pending Deliverables Preview */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Entregables Pendientes</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/deliverables">
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingDeliverables.slice(0, 3).map((deliverable) => (
                  <div
                    key={deliverable.id}
                    className="flex items-start gap-3 text-sm"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-secondary">
                        {deliverable.student
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{deliverable.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {deliverable.student}
                      </p>
                    </div>
                    <StatusBadge status={deliverable.status} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
