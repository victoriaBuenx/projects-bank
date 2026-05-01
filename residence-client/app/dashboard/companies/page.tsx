"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/star-rating"
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
  MapPin,
  Phone,
  FolderKanban,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock data
const companies = [
  {
    id: "c1",
    name: "MedTech Solutions",
    sector: "Tecnología en Salud",
    city: "Monterrey, NL",
    size: "Grande",
    phone: "+52 81 1234 5678",
    hasConvenio: true,
    rating: 4.5,
    activeProjects: 3,
    totalProjects: 8,
  },
  {
    id: "c2",
    name: "FastFood Corp",
    sector: "Alimentos y Bebidas",
    city: "Guadalajara, JAL",
    size: "Mediana",
    phone: "+52 33 9876 5432",
    hasConvenio: true,
    rating: 4.0,
    activeProjects: 2,
    totalProjects: 5,
  },
  {
    id: "c3",
    name: "EduTech MX",
    sector: "Educación",
    city: "Ciudad de México",
    size: "Mediana",
    phone: "+52 55 5555 1234",
    hasConvenio: true,
    rating: 4.8,
    activeProjects: 1,
    totalProjects: 3,
  },
  {
    id: "c4",
    name: "FinanceApp SA",
    sector: "Fintech",
    city: "Monterrey, NL",
    size: "Pequeña",
    phone: "+52 81 2222 3333",
    hasConvenio: false,
    rating: 3.5,
    activeProjects: 1,
    totalProjects: 2,
  },
  {
    id: "c5",
    name: "RetailMax",
    sector: "Retail",
    city: "Querétaro, QRO",
    size: "Grande",
    phone: "+52 442 111 2222",
    hasConvenio: true,
    rating: 4.2,
    activeProjects: 0,
    totalProjects: 4,
  },
  {
    id: "c6",
    name: "AutoParts Industrial",
    sector: "Manufactura",
    city: "Saltillo, COAH",
    size: "Grande",
    phone: "+52 844 333 4444",
    hasConvenio: true,
    rating: 3.8,
    activeProjects: 2,
    totalProjects: 6,
  },
]

export default function CompaniesPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sectorFilter, setSectorFilter] = useState<string>("all")
  const [convenioFilter, setConvenioFilter] = useState<string>("all")

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSector = sectorFilter === "all" || company.sector === sectorFilter
    const matchesConvenio =
      convenioFilter === "all" ||
      (convenioFilter === "yes" && company.hasConvenio) ||
      (convenioFilter === "no" && !company.hasConvenio)
    return matchesSearch && matchesSector && matchesConvenio
  })

  const sectors = [...new Set(companies.map((c) => c.sector))]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Empresas</h1>
            <p className="text-muted-foreground">
              Gestiona las empresas registradas en el sistema.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/companies/new">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Empresa
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
                    placeholder="Buscar empresas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={sectorFilter} onValueChange={setSectorFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los sectores</SelectItem>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={convenioFilter} onValueChange={setConvenioFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Convenio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="yes">Con Convenio</SelectItem>
                    <SelectItem value="no">Sin Convenio</SelectItem>
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
          Mostrando {filteredCompanies.length} de {companies.length} empresas
        </div>

        {/* Grid View */}
        {view === "grid" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => (
              <Card
                key={company.id}
                className="group overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{company.name}</CardTitle>
                        <CardDescription>{company.sector}</CardDescription>
                      </div>
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
                          <Link href={`/dashboard/companies/${company.id}`}>
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
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {company.city}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {company.phone}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <StarRating value={company.rating} readonly size="sm" />
                      <span className="text-sm text-muted-foreground">
                        ({company.rating})
                      </span>
                    </div>
                    {company.hasConvenio ? (
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Convenio
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">
                        <XCircle className="h-3 w-3 mr-1" />
                        Sin Convenio
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Proyectos activos</span>
                    <span className="font-medium">
                      {company.activeProjects} de {company.totalProjects}
                    </span>
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
                    <TableHead>Empresa</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Tamaño</TableHead>
                    <TableHead>Calificación</TableHead>
                    <TableHead>Convenio</TableHead>
                    <TableHead>Proyectos</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Building2 className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{company.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{company.sector}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {company.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{company.size}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StarRating value={company.rating} readonly size="sm" />
                          <span className="text-sm text-muted-foreground">
                            {company.rating}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {company.hasConvenio ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <FolderKanban className="h-4 w-4 text-muted-foreground" />
                          {company.activeProjects}/{company.totalProjects}
                        </div>
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
                              <Link href={`/dashboard/companies/${company.id}`}>
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
