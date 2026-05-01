"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { FileUpload } from "@/components/ui/file-upload"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  FileText,
  Clock,
  Calendar,
  Upload,
  MessageSquare,
  Star,
} from "lucide-react"
import Link from "next/link"

// Mock data
const deliverables = [
  {
    id: "d1",
    name: "Reporte de Avance Semanal",
    description: "Documento que describe el progreso realizado durante la semana.",
    project: "Sistema de Gestión Hospitalaria",
    student: { name: "Ana Martínez", avatar: null },
    dueDate: "2024-04-15",
    status: "pending" as const,
    submittedAt: null,
    grade: null,
    tutorComment: null,
  },
  {
    id: "d2",
    name: "Documento de Especificación",
    description: "Especificación técnica detallada del módulo de usuarios.",
    project: "App de Delivery",
    student: { name: "Carlos López", avatar: null },
    dueDate: "2024-04-12",
    status: "submitted" as const,
    submittedAt: "2024-04-11",
    grade: null,
    tutorComment: null,
  },
  {
    id: "d3",
    name: "Prototipo de UI",
    description: "Diseño de interfaces en Figma con componentes interactivos.",
    project: "Plataforma E-learning",
    student: { name: "María García", avatar: null },
    dueDate: "2024-04-18",
    status: "pending" as const,
    submittedAt: null,
    grade: null,
    tutorComment: null,
  },
  {
    id: "d4",
    name: "Diagrama de Base de Datos",
    description: "Modelo relacional de la base de datos del sistema.",
    project: "Sistema de Gestión Hospitalaria",
    student: { name: "Roberto Sánchez", avatar: null },
    dueDate: "2024-04-08",
    status: "graded" as const,
    submittedAt: "2024-04-07",
    grade: 95,
    tutorComment: "Excelente trabajo. El modelo está bien normalizado.",
  },
  {
    id: "d5",
    name: "Manual de Usuario",
    description: "Documentación de uso del sistema para usuarios finales.",
    project: "Dashboard Financiero",
    student: { name: "Laura Fernández", avatar: null },
    dueDate: "2024-04-20",
    status: "submitted" as const,
    submittedAt: "2024-04-19",
    grade: null,
    tutorComment: null,
  },
]

export default function DeliverablesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedDeliverable, setSelectedDeliverable] = useState<typeof deliverables[0] | null>(null)
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  const filteredDeliverables = deliverables.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.student.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || d.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const pendingCount = deliverables.filter((d) => d.status === "pending").length
  const submittedCount = deliverables.filter((d) => d.status === "submitted").length
  const gradedCount = deliverables.filter((d) => d.status === "graded").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Entregables</h1>
            <p className="text-muted-foreground">
              Gestiona y revisa los entregables de los estudiantes.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/deliverables/new">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Entregable
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <Clock className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pendientes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{submittedCount}</p>
                <p className="text-sm text-muted-foreground">Por Calificar</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <Star className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{gradedCount}</p>
                <p className="text-sm text-muted-foreground">Calificados</p>
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
                  placeholder="Buscar entregables..."
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
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="submitted">Entregados</SelectItem>
                  <SelectItem value="graded">Calificados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Deliverables List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Entregables</CardTitle>
            <CardDescription>
              {filteredDeliverables.length} entregables encontrados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredDeliverables.map((deliverable) => (
              <div
                key={deliverable.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{deliverable.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {deliverable.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Avatar className="h-4 w-4">
                          <AvatarFallback className="text-[8px]">
                            {deliverable.student.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        {deliverable.student.name}
                      </span>
                      <span>•</span>
                      <span>{deliverable.project}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(deliverable.dueDate).toLocaleDateString("es-MX")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  {deliverable.grade !== null && (
                    <div className="text-right">
                      <p className="text-lg font-bold text-success">{deliverable.grade}</p>
                      <p className="text-xs text-muted-foreground">Calificación</p>
                    </div>
                  )}
                  <StatusBadge status={deliverable.status} />
                  <div className="flex gap-2">
                    {deliverable.status === "pending" && (
                      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedDeliverable(deliverable)}
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Subir
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Subir Entregable</DialogTitle>
                            <DialogDescription>
                              Sube el archivo correspondiente a &quot;{selectedDeliverable?.name}&quot;
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <FileUpload
                              accept=".pdf,.doc,.docx,.zip"
                              maxSize={10}
                              onFileSelect={(file) => console.log("File selected:", file)}
                            />
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                              Cancelar
                            </Button>
                            <Button onClick={() => setIsUploadDialogOpen(false)}>
                              Subir Archivo
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                    {deliverable.status === "submitted" && (
                      <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => setSelectedDeliverable(deliverable)}
                          >
                            <Star className="h-4 w-4 mr-1" />
                            Calificar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Calificar Entregable</DialogTitle>
                            <DialogDescription>
                              Asigna una calificación y comentarios a &quot;{selectedDeliverable?.name}&quot;
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="grade">Calificación (0-100)</Label>
                              <Input
                                id="grade"
                                type="number"
                                min="0"
                                max="100"
                                placeholder="Ej: 85"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="comment">Comentarios</Label>
                              <Textarea
                                id="comment"
                                placeholder="Escribe tus comentarios sobre el entregable..."
                                rows={4}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsGradeDialogOpen(false)}>
                              Cancelar
                            </Button>
                            <Button onClick={() => setIsGradeDialogOpen(false)}>
                              Guardar Calificación
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                    {deliverable.status === "graded" && deliverable.tutorComment && (
                      <Button size="sm" variant="ghost">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
