"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
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
  Plus,
  LayoutGrid,
  List,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Building2,
  Users,
  Calendar,
  MapPin,
  Laptop,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock data
const projects = [
  {
    id: "1",
    name: "Sistema de Gestión Hospitalaria",
    company: "MedTech Solutions",
    description: "Desarrollo de un sistema integral para la gestión de pacientes y citas médicas.",
    careers: ["Ing. en Sistemas", "Ing. en Software"],
    status: "active" as const,
    modality: "Presencial",
    period: "Enero - Junio 2024",
    students: 3,
    technologies: ["React", "Node.js", "PostgreSQL"],
    hasSupport: true,
    supportAmount: "$8,000 MXN",
  },
  {
    id: "2",
    name: "App de Delivery",
    company: "FastFood Corp",
    description: "Aplicación móvil para pedidos de comida a domicilio.",
    careers: ["Ing. en Software"],
    status: "in-progress" as const,
    modality: "Híbrido",
    period: "Enero - Junio 2024",
    students: 2,
    technologies: ["React Native", "Firebase"],
    hasSupport: false,
    supportAmount: null,
  },
  {
    id: "3",
    name: "Plataforma E-learning",
    company: "EduTech MX",
    description: "Sistema de gestión de aprendizaje con videoconferencias integradas.",
    careers: ["Ing. en Sistemas", "Lic. en Informática"],
    status: "active" as const,
    modality: "Remoto",
    period: "Enero - Junio 2024",
    students: 4,
    technologies: ["Next.js", "WebRTC", "MongoDB"],
    hasSupport: true,
    supportAmount: "$10,000 MXN",
  },
  {
    id: "4",
    name: "Dashboard Financiero",
    company: "FinanceApp SA",
    description: "Panel de control para análisis y visualización de datos financieros.",
    careers: ["Ing. en Sistemas"],
    status: "paused" as const,
    modality: "Presencial",
    period: "Agosto - Diciembre 2024",
    students: 2,
    technologies: ["Vue.js", "Python", "MySQL"],
    hasSupport: true,
    supportAmount: "$6,000 MXN",
  },
  {
    id: "5",
    name: "Sistema de Inventarios",
    company: "RetailMax",
    description: "Control de inventario con código de barras y reportes automatizados.",
    careers: ["Ing. en Software", "Ing. Industrial"],
    status: "completed" as const,
    modality: "Híbrido",
    period: "Agosto - Diciembre 2023",
    students: 3,
    technologies: ["Angular", ".NET", "SQL Server"],
    hasSupport: false,
    supportAmount: null,
  },
]

const modalityIcons = {
  Presencial: MapPin,
  Remoto: Laptop,
  Híbrido: Building2,
}

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [modalityFilter, setModalityFilter] = useState<string>("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter
    const matchesModality =
      modalityFilter === "all" || project.modality === modalityFilter
    return matchesSearch && matchesStatus && matchesModality
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Proyectos</h1>
            <p className="text-muted-foreground">
              Gestiona y visualiza todos los proyectos de residencias.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/projects/new">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Proyecto
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar proyectos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="in-progress">En Proceso</SelectItem>
                    <SelectItem value="paused">Pausado</SelectItem>
                    <SelectItem value="completed">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={modalityFilter} onValueChange={setModalityFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Modalidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Presencial">Presencial</SelectItem>
                    <SelectItem value="Remoto">Remoto</SelectItem>
                    <SelectItem value="Híbrido">Híbrido</SelectItem>
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
          Mostrando {filteredProjects.length} de {projects.length} proyectos
        </div>

        {/* Grid View */}
        {view === "grid" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const ModalityIcon = modalityIcons[project.modality as keyof typeof modalityIcons]
              return (
                <Card
                  key={project.id}
                  className="group overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1 min-w-0">
                        <CardTitle className="text-base truncate">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {project.company}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/projects/${project.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalle
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {project.students}
                        </span>
                        <span className="flex items-center gap-1">
                          <ModalityIcon className="h-3.5 w-3.5" />
                          {project.modality}
                        </span>
                      </div>
                      <StatusBadge status={project.status} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* List View */}
        {view === "list" && (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proyecto</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Modalidad</TableHead>
                    <TableHead>Periodo</TableHead>
                    <TableHead>Estudiantes</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => {
                    const ModalityIcon = modalityIcons[project.modality as keyof typeof modalityIcons]
                    return (
                      <TableRow key={project.id}>
                        <TableCell>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {project.careers.join(", ")}
                          </div>
                        </TableCell>
                        <TableCell>{project.company}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <ModalityIcon className="h-4 w-4 text-muted-foreground" />
                            {project.modality}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {project.period}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {project.students}
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={project.status} />
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/projects/${project.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver Detalle
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
