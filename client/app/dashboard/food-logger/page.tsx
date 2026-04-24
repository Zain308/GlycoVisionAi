"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Camera, Upload, Sparkles, Utensils, Loader2 } from "lucide-react"

const recentMeals = [
  {
    name: "Chicken Biryani",
    time: "14:30 Today",
    carbs: 65,
    fat: 18,
    protein: 28,
    confidence: 94,
  },
  {
    name: "Naan with Daal",
    time: "08:15 Today",
    carbs: 52,
    fat: 8,
    protein: 14,
    confidence: 91,
  },
  {
    name: "Fruit Salad",
    time: "11:00 Yesterday",
    carbs: 28,
    fat: 1,
    protein: 2,
    confidence: 97,
  },
]

export default function FoodLoggerPage() {
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<typeof recentMeals[0] | null>(null)

  const handleAnalyze = () => {
    setAnalyzing(true)
    setResult(null)
    setTimeout(() => {
      setAnalyzing(false)
      setResult({
        name: "Grilled Chicken Wrap",
        time: "Just now",
        carbs: 42,
        fat: 12,
        protein: 32,
        confidence: 93,
      })
    }, 2500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Nutritionist</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload a photo of your meal and our Vision-Language Model will identify the dish,
          estimate portion size, and calculate macronutrients.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Area */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Food Photo Upload
            </CardTitle>
            <CardDescription>Snap or upload a clear photo of your meal</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border bg-secondary/30 p-12 transition-colors hover:border-primary/30 hover:bg-primary/[0.02] cursor-pointer">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG up to 10MB
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 gap-2" onClick={handleAnalyze} disabled={analyzing}>
                {analyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Analyze with AI
                  </>
                )}
              </Button>
              <Button variant="outline" className="gap-2">
                <Camera className="h-4 w-4" />
                Use Camera
              </Button>
            </div>

            {/* AI Result */}
            {result && (
              <div className="rounded-xl border border-success/30 bg-success/[0.04] p-5 animate-in fade-in duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-5 w-5 text-success" />
                  <p className="font-semibold text-foreground">AI Analysis Complete</p>
                  <Badge className="ml-auto bg-success/10 text-success border-success/20" variant="outline">
                    {result.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-lg font-bold text-foreground mb-4">{result.name}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-card p-3">
                    <span className="text-2xl font-bold text-primary">{result.carbs}g</span>
                    <span className="text-xs text-muted-foreground">Carbohydrates</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-card p-3">
                    <span className="text-2xl font-bold text-warning">{result.fat}g</span>
                    <span className="text-xs text-muted-foreground">Fat</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-card p-3">
                    <span className="text-2xl font-bold text-accent">{result.protein}g</span>
                    <span className="text-xs text-muted-foreground">Protein</span>
                  </div>
                </div>
                <Button className="w-full mt-4 gap-2" variant="outline">
                  <Utensils className="h-4 w-4" />
                  Confirm & Log Meal
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Meals */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-accent" />
              Recent Meals
            </CardTitle>
            <CardDescription>Previously analyzed food entries</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {recentMeals.map((meal, i) => (
              <div key={i}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{meal.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{meal.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {meal.confidence}% match
                  </Badge>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Carbs</span>
                      <span className="text-xs font-medium text-primary">{meal.carbs}g</span>
                    </div>
                    <Progress value={(meal.carbs / 100) * 100} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Fat</span>
                      <span className="text-xs font-medium text-warning">{meal.fat}g</span>
                    </div>
                    <Progress value={(meal.fat / 50) * 100} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Protein</span>
                      <span className="text-xs font-medium text-accent">{meal.protein}g</span>
                    </div>
                    <Progress value={(meal.protein / 50) * 100} className="h-1.5" />
                  </div>
                </div>
                {i < recentMeals.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}

            <div className="rounded-lg bg-secondary/50 p-4 mt-2">
              <p className="text-sm font-medium text-foreground">Today{"'"}s Summary</p>
              <div className="mt-2 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-primary">117g</p>
                  <p className="text-xs text-muted-foreground">Total Carbs</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-warning">26g</p>
                  <p className="text-xs text-muted-foreground">Total Fat</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-accent">42g</p>
                  <p className="text-xs text-muted-foreground">Total Protein</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
