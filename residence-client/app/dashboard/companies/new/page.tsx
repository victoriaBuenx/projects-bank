"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Check, ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const steps = [
  { id: "basics", title: "Datos Básicos", description: "Información general de la empresa" },
  { id: "location", title: "Ubicación", description: "Dirección y contacto" },
  { id: "additional", title: "Información Adicional", description: "Detalles y convenio" },
]

const sectors = [
  "Tecnología",
  "Tecnología en Salud",
  "Fintech",
  "Educación",
  "Manufactura",
  "Retail",
  "Alimentos y Bebidas",
  "Automotriz",
  "Logística",
  "Consultoría",
  "Otro",
]

const companySizes = [
  { value: "pequena", label: "Pequeña (1-50 empleados)" },
  { value: "mediana", label: "Mediana (51-250 empleados)" },
  { value: "grande", label: "Grande (251+ empleados)" },
]

export default function NewCompanyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Step 1: Datos Básicos
    nombreEmpresa: "",
    descripcion: "",
    sector: "",
    rfc: "",
    // Step 2: Ubicación
    pais: "México",
    estado: "",
    ciudad: "",
    direccion: "",
    cp: "",
    // Step 3: Información Adicional
    telefono: "",
    giro: "",
    tamañoEmpresa: "",
    convenio: false,
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit form
      console.log("Form submitted:", formData)
      router.push("/dashboard/companies")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/companies">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Nueva Empresa</h1>
            <p className="text-muted-foreground">
              Completa los datos para registrar una nueva empresa.
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
                  <Label htmlFor="nombreEmpresa">Nombre de la Empresa *</Label>
                  <Input
                    id="nombreEmpresa"
                    placeholder="Ej: TechSolutions SA de CV"
                    value={formData.nombreEmpresa}
                    onChange={(e) => updateFormData("nombreEmpresa", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Breve descripción de la empresa y sus actividades..."
                    rows={3}
                    value={formData.descripcion}
                    onChange={(e) => updateFormData("descripcion", e.target.value)}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector *</Label>
                    <Select
                      value={formData.sector}
                      onValueChange={(value) => updateFormData("sector", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rfc">RFC *</Label>
                    <Input
                      id="rfc"
                      placeholder="Ej: ABC123456XYZ"
                      value={formData.rfc}
                      onChange={(e) => updateFormData("rfc", e.target.value.toUpperCase())}
                      maxLength={13}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Ubicación */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pais">País</Label>
                    <Input
                      id="pais"
                      value={formData.pais}
                      onChange={(e) => updateFormData("pais", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado *</Label>
                    <Input
                      id="estado"
                      placeholder="Ej: Nuevo León"
                      value={formData.estado}
                      onChange={(e) => updateFormData("estado", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="ciudad">Ciudad *</Label>
                    <Input
                      id="ciudad"
                      placeholder="Ej: Monterrey"
                      value={formData.ciudad}
                      onChange={(e) => updateFormData("ciudad", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cp">Código Postal</Label>
                    <Input
                      id="cp"
                      placeholder="Ej: 64000"
                      value={formData.cp}
                      onChange={(e) => updateFormData("cp", e.target.value)}
                      maxLength={5}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Textarea
                    id="direccion"
                    placeholder="Calle, número, colonia..."
                    rows={2}
                    value={formData.direccion}
                    onChange={(e) => updateFormData("direccion", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Información Adicional */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      type="tel"
                      placeholder="+52 81 1234 5678"
                      value={formData.telefono}
                      onChange={(e) => updateFormData("telefono", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="giro">Giro</Label>
                    <Input
                      id="giro"
                      placeholder="Ej: Desarrollo de Software"
                      value={formData.giro}
                      onChange={(e) => updateFormData("giro", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tamañoEmpresa">Tamaño de la Empresa *</Label>
                  <Select
                    value={formData.tamañoEmpresa}
                    onValueChange={(value) => updateFormData("tamañoEmpresa", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tamaño" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="convenio">Convenio Vigente</Label>
                      <p className="text-xs text-muted-foreground">
                        ¿La empresa tiene convenio vigente con la institución?
                      </p>
                    </div>
                    <Switch
                      id="convenio"
                      checked={formData.convenio}
                      onCheckedChange={(checked) => updateFormData("convenio", checked)}
                    />
                  </div>
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
                "Registrar Empresa"
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
