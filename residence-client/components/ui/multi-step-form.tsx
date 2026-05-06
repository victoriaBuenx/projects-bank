"use client"

import { ReactNode, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check } from "lucide-react"

interface Step {
  id: string
  title: string
  description?: string
  content: ReactNode
}

interface MultiStepFormProps {
  steps: Step[]
  onComplete: () => void
  title?: string
  description?: string
}

export function MultiStepForm({ steps, onComplete, title, description }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
        
        {/* Progress Steps */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
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
                      "mt-2 text-xs font-medium hidden sm:block",
                      index <= currentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
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
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{steps[currentStep].title}</h3>
            {steps[currentStep].description && (
              <p className="text-sm text-muted-foreground">
                {steps[currentStep].description}
              </p>
            )}
          </div>
          {steps[currentStep].content}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Anterior
        </Button>
        <div className="text-sm text-muted-foreground">
          Paso {currentStep + 1} de {steps.length}
        </div>
        <Button onClick={handleNext}>
          {currentStep === steps.length - 1 ? "Completar" : "Siguiente"}
        </Button>
      </CardFooter>
    </Card>
  )
}
