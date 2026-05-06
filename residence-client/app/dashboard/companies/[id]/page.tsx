"use client"

import { use } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { StarRating } from "@/components/ui/star-rating"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Edit,
  Plus,
  FolderKanban,
  Users,
  CheckCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"

// Mock data
const companyData = {
  id: "c1",
  name: "MedTech Solutions",
  description: "Empresa líder en desarrollo de soluciones tecnológicas para el sector salud. Especializada en sistemas de gestión hospitalaria, telemedicina y dispositivos médicos IoT.",
  sector: "Tecnología en Salud",
  rfc: "MTS150123ABC",
  address: "Av. Constitución 1234, Col. Centro",
  city: "Monterrey",
  state: "Nuevo León",
  country: "México",
  postalCode: "64000",
  phone: "+52 81 1234 5678",
  email: "contacto@medtech.com.mx",
  website: "www.medtech.com.mx",
  size: "Grande",
  giro: "Desarrollo de Software Médico",
  hasConvenio: true,
  rating: 4.5,
  createdAt: "2022-06-15",
}

const contacts = [
  {
    id: "ct1",
    name: "Ing. Roberto Fernández",
    position: "Director de TI",
    phone: "+52 81 1234 5678",
    email: "roberto.fernandez@medtech.com.mx",
    schedule: "9:00 - 18:00",
  },
  {
    id: "ct2",
    name: "Lic. María González",
    position: "Recursos Humanos",
    phone: "+52 81 1234 5679",
    email: "maria.gonzalez@medtech.com.mx",
    schedule: "9:00 - 17:00",
  },
]

const projects = [
  {
    id: "p1",
    name: "Sistema de Gestión Hospitalaria",
    status: "active" as const,
    students: 3,
    period: "Ene - Jun 2024",
  },
  {
    id: "p2",
    name: "App de Telemedicina",
    status: "active" as const,
    students: 2,
    period: "Ene - Jun 2024",
  },
  {
    id: "p3",
    name: "Portal de Pacientes",
    status: "completed" as const,
    students: 2,
    period: "Ago - Dic 2023",
  },
  {
    id: "p4",
    name: "Sistema de Inventarios Médicos",
    status: "completed" as const,
    students: 3,
    period: "Ene - Jun 2023",
  },
]

const reviews = [
  {
    id: "r1",
    student: "Ana Martínez",
    project: "Sistema de Gestión Hospitalaria",
    rating: 5,
    comment: "Excelente ambiente de trabajo. El equipo fue muy profesional y me brindaron apoyo constante durante mi residencia.",
    date: "2024-03-15",
  },
  {
    id: "r2",
    student: "Carlos López",
    project: "Portal de Pacientes",
    rating: 4,
    comment: "Buena experiencia en general. Los proyectos son desafiantes y aprenden mucho sobre desarrollo real.",
    date: "2023-12-20",
  },
]

export default function CompanyDetailPage({
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
              <Link href="/dashboard/companies">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold tracking-tight">{companyData.name}</h1>
                  {companyData.hasConvenio && (
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Convenio Activo
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{companyData.sector}</span>
                  <span>•</span>
                  <span>{companyData.size}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <StarRating value={companyData.rating} readonly size="sm" />
                    <span>({companyData.rating})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Proyecto
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="info" className="w-full">
          <TabsList>
            <TabsTrigger value="info">Información</TabsTrigger>
            <TabsTrigger value="contacts">Contactos</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="reviews">Evaluaciones</TabsTrigger>
          </TabsList>

          {/* Información Tab */}
          <TabsContent value="info" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Acerca de la Empresa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {companyData.description}
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">RFC</p>
                      <p className="font-mono text-sm">{companyData.rfc}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Giro</p>
                      <p className="text-sm">{companyData.giro}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="text-sm">
                      <p>{companyData.address}</p>
                      <p>{companyData.city}, {companyData.state}</p>
                      <p>{companyData.country} CP {companyData.postalCode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{companyData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{companyData.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <a
                      href={`https://${companyData.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {companyData.website}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contactos Tab */}
          <TabsContent value="contacts" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Contactos de la Empresa</CardTitle>
                  <CardDescription>
                    Personas de contacto para coordinación de proyectos
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Contacto
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {contacts.map((contact) => (
                    <Card key={contact.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {contact.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div>
                              <p className="font-medium">{contact.name}</p>
                              <p className="text-sm text-muted-foreground">{contact.position}</p>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                {contact.phone}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                {contact.email}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {contact.schedule}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Proyectos Tab */}
          <TabsContent value="projects" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Proyectos</CardTitle>
                  <CardDescription>
                    Historial de proyectos con esta empresa
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Proyecto
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FolderKanban className="h-5 w-5" />
                        </div>
                        <div>
                          <Link
                            href={`/dashboard/projects/${project.id}`}
                            className="font-medium hover:text-primary hover:underline"
                          >
                            {project.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{project.period}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {project.students}
                        </div>
                        <StatusBadge status={project.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Evaluaciones Tab */}
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Evaluaciones de Estudiantes</CardTitle>
                    <CardDescription>
                      Feedback de estudiantes que realizaron residencias
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <StarRating value={companyData.rating} readonly size="md" />
                      <span className="text-2xl font-bold">{companyData.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{reviews.length} evaluaciones</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {review.student.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.student}</p>
                          <p className="text-sm text-muted-foreground">{review.project}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <StarRating value={review.rating} readonly size="sm" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(review.date).toLocaleDateString("es-MX")}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
