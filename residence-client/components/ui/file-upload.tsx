"use client"

import { useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Upload, File, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  onFileSelect?: (file: File) => void
  accept?: string
  maxSize?: number // in MB
  className?: string
}

export function FileUpload({
  onFileSelect,
  accept = ".pdf,.doc,.docx,.zip",
  maxSize = 10,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true)
    } else if (e.type === "dragleave") {
      setIsDragging(false)
    }
  }, [])

  const validateFile = useCallback(
    (file: File) => {
      const fileSizeMB = file.size / (1024 * 1024)
      if (fileSizeMB > maxSize) {
        setError(`El archivo excede el tamaño máximo de ${maxSize}MB`)
        return false
      }
      setError(null)
      return true
    },
    [maxSize]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const droppedFile = e.dataTransfer.files[0]
        if (validateFile(droppedFile)) {
          setFile(droppedFile)
          onFileSelect?.(droppedFile)
        }
      }
    },
    [onFileSelect, validateFile]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0]
        if (validateFile(selectedFile)) {
          setFile(selectedFile)
          onFileSelect?.(selectedFile)
        }
      }
    },
    [onFileSelect, validateFile]
  )

  const handleRemove = () => {
    setFile(null)
    setError(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className={cn("w-full", className)}>
      {!file ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="mt-4 text-sm font-medium">
            Arrastra y suelta tu archivo aquí
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            o haz clic para seleccionar
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Formatos: {accept.replace(/\./g, "").toUpperCase().replace(/,/g, ", ")} (máx. {maxSize}MB)
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <File className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(file.size)}
            </p>
          </div>
          <CheckCircle className="h-5 w-5 text-success shrink-0" />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
