"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type StatusType =
  | "pending"
  | "submitted"
  | "graded"
  | "active"
  | "paused"
  | "completed"
  | "cancelled"
  | "in-progress"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

const statusConfig: Record<
  StatusType,
  { label: string; className: string }
> = {
  pending: {
    label: "Pendiente",
    className: "bg-muted text-muted-foreground border-muted-foreground/20",
  },
  submitted: {
    label: "Entregado",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  graded: {
    label: "Calificado",
    className: "bg-success/10 text-success border-success/20",
  },
  active: {
    label: "Activo",
    className: "bg-success/10 text-success border-success/20",
  },
  paused: {
    label: "Pausado",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  completed: {
    label: "Finalizado",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  cancelled: {
    label: "Cancelado",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  "in-progress": {
    label: "En Proceso",
    className: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  )
}
