"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Check, ArrowLeft, ArrowRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const steps = [
  { id: "basics", title: "Datos Básicos", description: "Información general del proyecto" },
  { id: "details", title: "Detalles", description: "Configuración y requisitos" },
  { id: "extras", title: "Extras", description: "Tecnologías y apoyo económico" },
]

const careers = [
  "Ing. en Sistemas Computacionales",
  "Ing. en Software",
  "Ing. en Informática",
  "Lic. en Informática",
  "Ing. Industrial",
  "Ing. en Gestión Empresarial",
]

const technologies = [
  "React", "Next.js", "Vue.js", "Angular", "Node.js", "Python", "Java", 
  ".NET", "PHP", "Ruby", "Go", "Rust", "PostgreSQL", "MySQL", "MongoDB",
  "Firebase", "AWS", "Azure", "Docker", "Kubernetes"
]

export default function NewProjectPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    nombreProyecto: "",
    descripcion: "",
    carreras: [] as string[],
    periodo: "",
    modalidad: "",
    tipoProyecto: "",
    numeroEstudiantes: "",
    tecnologias: [] as string[],
    apoyoEconomico: false,
    montoApoyo: "",
    plazosEntrega: "",
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit form
      console.log("Form submitted:", formData)
      router.push("/dashboard/projects")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleCareer = (career: string) => {
    setFormData((prev) => ({
      ...prev,
      carreras: prev.carreras.includes(career)
        ? prev.carreras.filter((c) => c !== career)
        : [...prev.carreras, career],
    }))
  }

  const toggleTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      tecnologias: prev.tecnologias.includes(tech)
        ? prev.tecnologias.filter((t) => t !== tech)
        : [...prev.tecnologias, tech],
    }))
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Nuevo Proyecto</h1>
            <p className="text-muted-foreground">
              Completa los datos para registrar un nuevo proyecto.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all",
                        index < currentStep
                          ? "border-primary bg-primary text-primary-foreground"
                          : index === currentStep
                          ? "border-primary text-primary bg-primary/10"
                          : "border-muted text-muted-foreground"
                      )}
                    >
                      {index < currentStep ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span
                      className={cn(
                        "mt-2 text-xs font-medium hidden sm:block text-center",
                        index <= currentStep ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 w-12 sm:w-24 mx-2 transition-colors",
                        index < currentStep ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Datos Básicos */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombreProyecto">Nombre del Proyecto *</Label>
                  <Input
                    id="nombreProyecto"
                    placeholder="Ej: Sistema de Gestión de Inventarios"
                    value={formData.nombreProyecto}
                    onChange={(e) =>
                      setFormData({ ...formData, nombreProyecto: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción *</Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Describe el proyecto, sus objetivos y alcance..."
                    rows={4}
                    value={formData.descripcion}
                    onChange={(e) =>
                      setFormData({ ...formData, descripcion: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Carreras Relacionadas *</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Selecciona las carreras que pueden participar en este proyecto.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {careers.map((career) => (
                      <Badge
                        key={career}
                        variant={formData.carreras.includes(career) ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer transition-colors",
                          formData.carreras.includes(career)
                            ? "bg-primary hover:bg-primary/90"
                            : "hover:bg-muted"
                        )}
                        onClick={() => toggleCareer(career)}
                      >
                        {formData.carreras.includes(career) && (
                          <Check className="h-3 w-3 mr-1" />
                        )}
                        {career}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Detalles */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="periodo">Periodo *</Label>
                    <Input
                      id="periodo"
                      placeholder="Ej: Enero - Junio 2024"
                      value={formData.periodo}
                      onChange={(e) =>
                        setFormData({ ...formData, periodo: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="modalidad">Modalidad *</Label>
                    <Select
                      value={formData.modalidad}
                      onValueChange={(value) =>
                        setFormData({ ...formData, modalidad: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona modalidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Presencial">Presencial</SelectItem>
                        <SelectItem value="Remoto">Remoto</SelectItem>
                        <SelectItem value="Híbrido">Híbrido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tipoProyecto">Tipo de Proyecto *</Label>
                    <Select
                      value={formData.tipoProyecto}
                      onValueChange={(value) =>
                        setFormData({ ...formData, tipoProyecto: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Desarrollo de Software">
                          Desarrollo de Software
                        </SelectItem>
                        <SelectItem value="Investigación">Investigación</SelectItem>
                        <SelectItem value="Consultoría">Consultoría</SelectItem>
                        <SelectItem value="Implementación">Implementación</SelectItem>
                        <SelectItem value="Soporte Técnico">Soporte Técnico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numeroEstudiantes">Número de Estudiantes *</Label>
                    <Input
                      id="numeroEstudiantes"
                      type="number"
                      min="1"
                      max="10"
                      placeholder="Ej: 3"
                      value={formData.numeroEstudiantes}
                      onChange={(e) =>
                        setFormData({ ...formData, numeroEstudiantes: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Extras */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Tecnologías</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Selecciona las tecnologías que se utilizarán en el proyecto.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant={formData.tecnologias.includes(tech) ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer transition-colors",
                          formData.tecnologias.includes(tech)
                            ? "bg-primary hover:bg-primary/90"
                            : "hover:bg-muted"
                        )}
                        onClick={() => toggleTechnology(tech)}
                      >
                        {formData.tecnologias.includes(tech) && (
                          <Check className="h-3 w-3 mr-1" />
                        )}
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {formData.tecnologias.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Seleccionadas:</span>
                      <div className="flex flex-wrap gap-1">
                        {formData.tecnologias.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                            <button
                              onClick={() => toggleTechnology(tech)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="apoyoEconomico">Apoyo Económico</Label>
                      <p className="text-xs text-muted-foreground">
                        ¿El proyecto ofrece apoyo económico mensual?
                      </p>
                    </div>
                    <Switch
                      id="apoyoEconomico"
                      checked={formData.apoyoEconomico}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, apoyoEconomico: checked })
                      }
                    />
                  </div>

                  {formData.apoyoEconomico && (
                    <div className="space-y-2 pt-2">
                      <Label htmlFor="montoApoyo">Monto Mensual</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="montoApoyo"
                          placeholder="0.00"
                          className="pl-7"
                          value={formData.montoApoyo}
                          onChange={(e) =>
                            setFormData({ ...formData, montoApoyo: e.target.value })
                          }
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          MXN
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plazosEntrega">Plazos de Entrega</Label>
                  <Textarea
                    id="plazosEntrega"
                    placeholder="Describe los plazos y fechas importantes del proyecto..."
                    rows={3}
                    value={formData.plazosEntrega}
                    onChange={(e) =>
                      setFormData({ ...formData, plazosEntrega: e.target.value })
                    }
                  />
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            <div className="text-sm text-muted-foreground">
              Paso {currentStep + 1} de {steps.length}
            </div>
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? (
                "Crear Proyecto"
              ) : (
                <>
                  Siguiente
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}
