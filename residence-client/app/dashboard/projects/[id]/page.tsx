"use client"

import { use } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Building2,
  Calendar,
  Users,
  MapPin,
  DollarSign,
  Edit,
  UserPlus,
  FileText,
  Clock,
  CheckCircle,
  Circle,
} from "lucide-react"
import Link from "next/link"

// Mock data
const projectData = {
  id: "1",
  name: "Sistema de Gestión Hospitalaria",
  company: {
    name: "MedTech Solutions",
    id: "c1",
  },
  description: "Desarrollo de un sistema integral para la gestión de pacientes y citas médicas. El sistema incluirá módulos para registro de pacientes, agenda de citas, historial médico electrónico, facturación y reportes estadísticos.",
  careers: ["Ing. en Sistemas Computacionales", "Ing. en Software"],
  status: "active" as const,
  modality: "Presencial",
  period: "Enero - Junio 2024",
  technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
  hasSupport: true,
  supportAmount: "$8,000 MXN",
  studentsRequired: 3,
  createdAt: "2024-01-15",
}

const assignedStudents = [
  {
    id: "s1",
    name: "Ana Martínez López",
    email: "ana.martinez@estudiante.edu",
    career: "Ing. en Sistemas",
    progress: 75,
  },
  {
    id: "s2",
    name: "Carlos Rodríguez Pérez",
    email: "carlos.rodriguez@estudiante.edu",
    career: "Ing. en Software",
    progress: 60,
  },
  {
    id: "s3",
    name: "María García Hernández",
    email: "maria.garcia@estudiante.edu",
    career: "Ing. en Sistemas",
    progress: 80,
  },
]

const tutor = {
  id: "t1",
  name: "Dr. Roberto Sánchez",
  email: "roberto.sanchez@universidad.edu",
  department: "Sistemas y Computación",
}

const deliverables = [
  {
    id: "d1",
    name: "Documento de Especificación de Requisitos",
    dueDate: "2024-02-15",
    status: "graded" as const,
  },
  {
    id: "d2",
    name: "Diseño de Base de Datos",
    dueDate: "2024-03-01",
    status: "graded" as const,
  },
  {
    id: "d3",
    name: "Prototipo de Interfaz de Usuario",
    dueDate: "2024-03-15",
    status: "submitted" as const,
  },
  {
    id: "d4",
    name: "Reporte de Avance Mensual - Marzo",
    dueDate: "2024-04-01",
    status: "pending" as const,
  },
  {
    id: "d5",
    name: "Versión Beta del Sistema",
    dueDate: "2024-05-01",
    status: "pending" as const,
  },
]

const timeline = [
  { date: "15 Ene 2024", event: "Proyecto creado", completed: true },
  { date: "20 Ene 2024", event: "Estudiantes asignados", completed: true },
  { date: "22 Ene 2024", event: "Tutor asignado", completed: true },
  { date: "15 Feb 2024", event: "Entrega: Especificación de Requisitos", completed: true },
  { date: "01 Mar 2024", event: "Entrega: Diseño de BD", completed: true },
  { date: "15 Mar 2024", event: "Entrega: Prototipo UI", completed: false },
  { date: "01 Jun 2024", event: "Fecha de finalización", completed: false },
]

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/projects">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold tracking-tight">{projectData.name}</h1>
                <StatusBadge status={projectData.status} />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <Link
                  href={`/dashboard/companies/${projectData.company.id}`}
                  className="hover:text-primary hover:underline"
                >
                  {projectData.company.name}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Asignar Estudiante
            </Button>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Periodo</p>
                <p className="font-medium text-sm">{projectData.period}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Modalidad</p>
                <p className="font-medium text-sm">{projectData.modality}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Estudiantes</p>
                <p className="font-medium text-sm">{assignedStudents.length}/{projectData.studentsRequired}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Apoyo Económico</p>
                <p className="font-medium text-sm">{projectData.hasSupport ? projectData.supportAmount : "Sin apoyo"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="info" className="w-full">
              <TabsList>
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="students">Estudiantes</TabsTrigger>
                <TabsTrigger value="deliverables">Entregables</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Descripción del Proyecto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {projectData.description}
                    </p>
                    
                    <div className="pt-4 border-t space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Carreras Relacionadas</p>
                        <div className="flex flex-wrap gap-2">
                          {projectData.careers.map((career) => (
                            <Badge key={career} variant="secondary">
                              {career}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Tecnologías</p>
                        <div className="flex flex-wrap gap-2">
                          {projectData.technologies.map((tech) => (
                            <Badge key={tech} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="students" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Estudiantes Asignados</CardTitle>
                    <CardDescription>
                      {assignedStudents.length} de {projectData.studentsRequired} posiciones ocupadas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {assignedStudents.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.career}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{student.progress}%</p>
                          <p className="text-xs text-muted-foreground">Avance</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="deliverables" className="mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Entregables</CardTitle>
                      <CardDescription>Lista de entregables del proyecto</CardDescription>
                    </div>
                    <Button size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Nuevo Entregable
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {deliverables.map((deliverable) => (
                      <div
                        key={deliverable.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{deliverable.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Fecha límite: {new Date(deliverable.dueDate).toLocaleDateString("es-MX")}
                            </p>
                          </div>
                        </div>
                        <StatusBadge status={deliverable.status} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Tutor */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tutor Asignado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {tutor.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{tutor.name}</p>
                    <p className="text-sm text-muted-foreground">{tutor.department}</p>
                    <p className="text-xs text-muted-foreground">{tutor.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Línea de Tiempo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        {item.completed ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                        {index < timeline.length - 1 && (
                          <div className="w-px h-full bg-border my-1" />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-medium">{item.event}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
