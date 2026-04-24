"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  Mic,
  MicOff,
  Brain,
  Heart,
  BarChart3,
  Loader2,
  Radio,
  Watch,
  Volume2,
} from "lucide-react"

export default function StressDetectorPage() {
  const [recording, setRecording] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [manualStress, setManualStress] = useState([45])

  const handleRecord = () => {
    if (recording) {
      setRecording(false)
      setAnalyzed(false)
      setTimeout(() => setAnalyzed(true), 2000)
    } else {
      setRecording(true)
      setAnalyzed(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Physiologist</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Detect stress levels that affect insulin resistance through vocal biomarker
          analysis or manual wearable data entry.
        </p>
      </div>

      <Tabs defaultValue="voice">
        <TabsList>
          <TabsTrigger value="voice" className="gap-2">
            <Mic className="h-4 w-4" />
            Voice Analysis
          </TabsTrigger>
          <TabsTrigger value="manual" className="gap-2">
            <Watch className="h-4 w-4" />
            Manual Entry
          </TabsTrigger>
        </TabsList>

        <TabsContent value="voice" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recording */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-accent" />
                  Voice Recording
                </CardTitle>
                <CardDescription>
                  Speak naturally. The AI analyzes pitch, jitter, and shimmer patterns
                  to detect acute stress levels.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6">
                {/* Waveform visualization */}
                <div className="relative flex h-32 w-full items-center justify-center rounded-xl bg-secondary/50 overflow-hidden">
                  {recording ? (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full bg-accent"
                          style={{
                            height: `${Math.random() * 60 + 20}%`,
                            animation: `pulse ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate`,
                            animationDelay: `${i * 0.05}s`,
                          }}
                        />
                      ))}
                    </div>
                  ) : analyzed ? (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full bg-primary/40"
                          style={{ height: `${15 + Math.sin(i * 0.5) * 30 + 25}%` }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <Radio className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Ready to record</p>
                    </div>
                  )}
                </div>

                <Button
                  size="lg"
                  onClick={handleRecord}
                  className={`gap-2 w-full ${recording ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" : ""}`}
                >
                  {recording ? (
                    <>
                      <MicOff className="h-5 w-5" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="h-5 w-5" />
                      Start Voice Recording
                    </>
                  )}
                </Button>

                {!recording && !analyzed && (
                  <p className="text-xs text-muted-foreground text-center">
                    Tip: Speak for at least 10 seconds. Describe how you{"'"}re feeling
                    or talk about your day for best results.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-chart-3" />
                  Stress Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analyzed ? (
                  <div className="flex flex-col gap-5 animate-in fade-in duration-500">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Overall Stress Level</span>
                      <Badge className="bg-warning/10 text-warning border-warning/20" variant="outline">
                        Moderate
                      </Badge>
                    </div>

                    <div className="flex flex-col items-center gap-3 py-4">
                      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-warning/30 bg-warning/5">
                        <span className="text-4xl font-bold text-foreground">62</span>
                        <span className="absolute bottom-2 text-xs text-muted-foreground">/100</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Stress Score via Vocal Biomarkers
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-muted-foreground">Pitch Variation</span>
                          <span className="text-sm font-medium text-foreground">Elevated</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-muted-foreground">Jitter (Cycle-to-Cycle)</span>
                          <span className="text-sm font-medium text-warning">High</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-muted-foreground">Shimmer (Amplitude)</span>
                          <span className="text-sm font-medium text-foreground">Normal</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-muted-foreground">Speech Rate</span>
                          <span className="text-sm font-medium text-foreground">Slightly Fast</span>
                        </div>
                        <Progress value={58} className="h-2" />
                      </div>
                    </div>

                    <div className="rounded-lg bg-warning/[0.06] border border-warning/20 p-4 mt-2">
                      <p className="text-sm text-foreground">
                        <strong>Impact on Glucose:</strong> Moderate stress may increase insulin
                        resistance by ~15-20%. The Forecaster has incorporated this factor.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                    {recording ? (
                      <>
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        <p className="text-sm text-muted-foreground">Listening to your voice...</p>
                      </>
                    ) : (
                      <>
                        <BarChart3 className="h-12 w-12 text-muted-foreground/20" />
                        <p className="text-sm text-muted-foreground">
                          Record a voice sample to see stress analysis results
                        </p>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manual" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Watch className="h-5 w-5 text-primary" />
                  Smartwatch Data Entry
                </CardTitle>
                <CardDescription>
                  Manually input your stress score or HRV status from your wearable
                  device (Apple Watch, Garmin, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <Label>Stress Score (0-100)</Label>
                  <Slider
                    value={manualStress}
                    onValueChange={setManualStress}
                    max={100}
                    step={1}
                    className="py-2"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Low</span>
                    <span className="text-lg font-bold text-foreground">{manualStress[0]}</span>
                    <span className="text-xs text-muted-foreground">High</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="hrv">Heart Rate Variability (ms)</Label>
                  <Input id="hrv" type="number" placeholder="e.g. 42" />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="rhr">Resting Heart Rate (bpm)</Label>
                  <Input id="rhr" type="number" placeholder="e.g. 72" />
                </div>

                <Button className="gap-2">
                  <Heart className="h-4 w-4" />
                  Submit Stress Data
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>How Stress Affects Glucose</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Acute stress triggers cortisol and adrenaline release, which directly
                  increases insulin resistance and hepatic glucose output. This means
                  the same meal can cause a significantly higher glucose spike when
                  you{"'"}re stressed.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Low Stress (0-30)", effect: "+5-10% glucose impact", color: "text-success" },
                    { label: "Moderate Stress (31-60)", effect: "+15-25% glucose impact", color: "text-warning" },
                    { label: "High Stress (61-100)", effect: "+25-40% glucose impact", color: "text-destructive" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
                      <span className="text-sm text-foreground">{item.label}</span>
                      <span className={`text-sm font-medium ${item.color}`}>{item.effect}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
