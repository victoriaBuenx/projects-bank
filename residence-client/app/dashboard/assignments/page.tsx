"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Search,
  Plus,
  Users,
  FolderKanban,
  Calendar,
  ArrowRight,
  CheckCircle,
  Circle,
  Clock,
  User,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"

// Mock data
const assignments = [
  {
    id: "a1",
    project: {
      id: "p1",
      name: "Sistema de Gestión Hospitalaria",
      company: "MedTech Solutions",
    },
    student: {
      id: "s1",
      name: "Ana Martínez López",
      email: "ana.martinez@estudiante.edu",
      career: "Ing. en Sistemas",
    },
    tutor: {
      id: "t1",
      name: "Dr. Roberto Sánchez",
      department: "Sistemas y Computación",
    },
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    status: "in-progress" as const,
    progress: 65,
    deliverablesCompleted: 4,
    totalDeliverables: 6,
  },
  {
    id: "a2",
    project: {
      id: "p2",
      name: "App de Delivery",
      company: "FastFood Corp",
    },
    student: {
      id: "s2",
      name: "Carlos López Pérez",
      email: "carlos.lopez@estudiante.edu",
      career: "Ing. en Software",
    },
    tutor: {
      id: "t2",
      name: "Dra. Laura Hernández",
      department: "Desarrollo de Software",
    },
    startDate: "2024-02-01",
    endDate: "2024-07-01",
    status: "in-progress" as const,
    progress: 45,
    deliverablesCompleted: 2,
    totalDeliverables: 5,
  },
  {
    id: "a3",
    project: {
      id: "p3",
      name: "Plataforma E-learning",
      company: "EduTech MX",
    },
    student: {
      id: "s3",
      name: "María García Hernández",
      email: "maria.garcia@estudiante.edu",
      career: "Ing. en Informática",
    },
    tutor: {
      id: "t1",
      name: "Dr. Roberto Sánchez",
      department: "Sistemas y Computación",
    },
    startDate: "2024-01-20",
    endDate: "2024-06-20",
    status: "in-progress" as const,
    progress: 80,
    deliverablesCompleted: 5,
    totalDeliverables: 6,
  },
  {
    id: "a4",
    project: {
      id: "p4",
      name: "Sistema de Inventarios",
      company: "RetailMax",
    },
    student: {
      id: "s4",
      name: "Roberto Sánchez Villa",
      email: "roberto.sanchez@estudiante.edu",
      career: "Ing. en Sistemas",
    },
    tutor: {
      id: "t3",
      name: "Dr. Miguel Ángel Torres",
      department: "Bases de Datos",
    },
    startDate: "2023-08-15",
    endDate: "2023-12-15",
    status: "completed" as const,
    progress: 100,
    deliverablesCompleted: 6,
    totalDeliverables: 6,
  },
]

const availableStudents = [
  { id: "ns1", name: "Pedro Ramírez", career: "Ing. en Sistemas" },
  { id: "ns2", name: "Sofia Morales", career: "Ing. en Software" },
  { id: "ns3", name: "Diego Vargas", career: "Ing. en Informática" },
]

const availableTutors = [
  { id: "nt1", name: "Dr. Roberto Sánchez", department: "Sistemas" },
  { id: "nt2", name: "Dra. Laura Hernández", department: "Software" },
  { id: "nt3", name: "Dr. Miguel Torres", department: "Bases de Datos" },
]

const availableProjects = [
  { id: "np1", name: "Dashboard Financiero", company: "FinanceApp SA" },
  { id: "np2", name: "App de Telemedicina", company: "MedTech Solutions" },
]

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredAssignments = assignments.filter((a) => {
    const matchesSearch =
      a.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tutor.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || a.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const activeCount = assignments.filter((a) => a.status === "in-progress").length
  const completedCount = assignments.filter((a) => a.status === "completed").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Asignaciones</h1>
            <p className="text-muted-foreground">
              Gestiona las asignaciones de estudiantes a proyectos.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Asignación
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Nueva Asignación</DialogTitle>
                <DialogDescription>
                  Asigna un estudiante y tutor a un proyecto disponible.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Proyecto</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un proyecto" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProjects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          <div className="flex flex-col">
                            <span>{project.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {project.company}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Estudiante</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estudiante" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          <div className="flex flex-col">
                            <span>{student.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {student.career}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tutor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tutor" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTutors.map((tutor) => (
                        <SelectItem key={tutor.id} value={tutor.id}>
                          <div className="flex flex-col">
                            <span>{tutor.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {tutor.department}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Fecha de Inicio</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de Fin</Label>
                    <Input type="date" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Crear Asignación
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCount}</p>
                <p className="text-sm text-muted-foreground">Asignaciones Activas</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedCount}</p>
                <p className="text-sm text-muted-foreground">Completadas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por estudiante, proyecto o tutor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="in-progress">En Proceso</SelectItem>
                  <SelectItem value="completed">Completadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Assignments List */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">
                      <Link
                        href={`/dashboard/projects/${assignment.project.id}`}
                        className="hover:text-primary hover:underline"
                      >
                        {assignment.project.name}
                      </Link>
                    </CardTitle>
                    <CardDescription>{assignment.project.company}</CardDescription>
                  </div>
                  <StatusBadge status={assignment.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Timeline */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(assignment.startDate).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(assignment.endDate).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-medium">{assignment.progress}%</span>
                  </div>
                  <Progress value={assignment.progress} className="h-2" />
                </div>

                {/* People */}
                <div className="grid gap-3 pt-2 border-t">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-secondary">
                        {assignment.student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{assignment.student.name}</p>
                      <p className="text-xs text-muted-foreground">{assignment.student.career}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      Estudiante
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {assignment.tutor.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{assignment.tutor.name}</p>
                      <p className="text-xs text-muted-foreground">{assignment.tutor.department}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      <User className="h-3 w-3 mr-1" />
                      Tutor
                    </Badge>
                  </div>
                </div>

                {/* Deliverables Status */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-sm text-muted-foreground">Entregables</span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: assignment.totalDeliverables }).map((_, i) => (
                        i < assignment.deliverablesCompleted ? (
                          <CheckCircle key={i} className="h-4 w-4 text-success" />
                        ) : (
                          <Circle key={i} className="h-4 w-4 text-muted-foreground/30" />
                        )
                      ))}
                    </div>
                    <span className="text-sm font-medium">
                      {assignment.deliverablesCompleted}/{assignment.totalDeliverables}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
