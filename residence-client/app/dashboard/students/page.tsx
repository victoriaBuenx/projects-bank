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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  LayoutGrid,
  List,
  MoreHorizontal,
  Eye,
  Mail,
  GraduationCap,
  FolderKanban,
  FileCheck,
} from "lucide-react"
import Link from "next/link"

// Mock data
const students = [
  {
    id: "s1",
    name: "Ana Martínez López",
    email: "ana.martinez@estudiante.edu",
    career: "Ing. en Sistemas Computacionales",
    semester: 8,
    project: {
      id: "p1",
      name: "Sistema de Gestión Hospitalaria",
      company: "MedTech Solutions",
    },
    tutor: "Dr. Roberto Sánchez",
    status: "in-progress" as const,
    progress: 75,
    deliverablesCompleted: 4,
    totalDeliverables: 6,
  },
  {
    id: "s2",
    name: "Carlos López Pérez",
    email: "carlos.lopez@estudiante.edu",
    career: "Ing. en Software",
    semester: 9,
    project: {
      id: "p2",
      name: "App de Delivery",
      company: "FastFood Corp",
    },
    tutor: "Dra. Laura Hernández",
    status: "in-progress" as const,
    progress: 45,
    deliverablesCompleted: 2,
    totalDeliverables: 5,
  },
  {
    id: "s3",
    name: "María García Hernández",
    email: "maria.garcia@estudiante.edu",
    career: "Ing. en Informática",
    semester: 8,
    project: {
      id: "p3",
      name: "Plataforma E-learning",
      company: "EduTech MX",
    },
    tutor: "Dr. Roberto Sánchez",
    status: "in-progress" as const,
    progress: 80,
    deliverablesCompleted: 5,
    totalDeliverables: 6,
  },
  {
    id: "s4",
    name: "Roberto Sánchez Villa",
    email: "roberto.sanchez.v@estudiante.edu",
    career: "Ing. en Sistemas Computacionales",
    semester: 9,
    project: {
      id: "p4",
      name: "Sistema de Inventarios",
      company: "RetailMax",
    },
    tutor: "Dr. Miguel Ángel Torres",
    status: "completed" as const,
    progress: 100,
    deliverablesCompleted: 6,
    totalDeliverables: 6,
  },
  {
    id: "s5",
    name: "Laura Fernández Díaz",
    email: "laura.fernandez@estudiante.edu",
    career: "Lic. en Informática",
    semester: 7,
    project: {
      id: "p5",
      name: "Dashboard Financiero",
      company: "FinanceApp SA",
    },
    tutor: "Dra. Carmen Ruiz",
    status: "in-progress" as const,
    progress: 30,
    deliverablesCompleted: 1,
    totalDeliverables: 5,
  },
]

export default function StudentsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [careerFilter, setCareerFilter] = useState<string>("all")

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.project.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    const matchesCareer = careerFilter === "all" || student.career === careerFilter
    return matchesSearch && matchesStatus && matchesCareer
  })

  const careers = [...new Set(students.map((s) => s.career))]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Estudiantes</h1>
            <p className="text-muted-foreground">
              Visualiza y gestiona los estudiantes con residencias activas.
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar estudiantes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="in-progress">En Proceso</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={careerFilter} onValueChange={setCareerFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Carrera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las carreras</SelectItem>
                    {careers.map((career) => (
                      <SelectItem key={career} value={career}>
                        {career}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={view === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setView("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="text-sm text-muted-foreground">
          Mostrando {filteredStudents.length} de {students.length} estudiantes
        </div>

        {/* Grid View */}
        {view === "grid" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base truncate">{student.name}</CardTitle>
                      <CardDescription className="truncate">{student.email}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Enviar Correo
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {student.career}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {student.semester}° Semestre
                    </Badge>
                  </div>

                  <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 text-sm">
                      <FolderKanban className="h-4 w-4 text-muted-foreground" />
                      <Link
                        href={`/dashboard/projects/${student.project.id}`}
                        className="font-medium hover:text-primary hover:underline truncate"
                      >
                        {student.project.name}
                      </Link>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">
                      {student.project.company}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-medium">{student.progress}%</span>
                    </div>
                    <Progress value={student.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <FileCheck className="h-4 w-4" />
                      {student.deliverablesCompleted}/{student.totalDeliverables} entregables
                    </div>
                    <StatusBadge status={student.status} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* List View */}
        {view === "list" && (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Carrera</TableHead>
                    <TableHead>Proyecto</TableHead>
                    <TableHead>Tutor</TableHead>
                    <TableHead>Progreso</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{student.career}</p>
                          <p className="text-xs text-muted-foreground">
                            {student.semester}° Semestre
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <Link
                            href={`/dashboard/projects/${student.project.id}`}
                            className="font-medium hover:text-primary hover:underline"
                          >
                            {student.project.name}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {student.project.company}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{student.tutor}</TableCell>
                      <TableCell>
                        <div className="w-24">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>{student.progress}%</span>
                          </div>
                          <Progress value={student.progress} className="h-1.5" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={student.status} />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Enviar Correo
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
