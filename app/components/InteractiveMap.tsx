"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface MapPoint {
  id: string
  x: number
  y: number
  prompt: string
  imageUrl: string
  answer: string
}

interface InteractiveMapProps {
  mapPoints: MapPoint[]
  onComplete: () => void
}

export default function InteractiveMap({ mapPoints, onComplete }: InteractiveMapProps) {
  const [activePoint, setActivePoint] = useState<MapPoint | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [completedPoints, setCompletedPoints] = useState<string[]>([])

  const handlePointClick = (point: MapPoint) => {
    setActivePoint(point)
    setUserAnswer("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (activePoint && userAnswer.toLowerCase().trim() === activePoint.answer.toLowerCase()) {
      setCompletedPoints([...completedPoints, activePoint.id])
      setActivePoint(null)
      if (completedPoints.length + 1 === mapPoints.length) {
        onComplete()
      }
    } else {
      alert("Oops! That's not quite right. Try again!")
    }
  }

  return (
    <div className="relative w-full h-[600px] bg-blue-100 rounded-lg overflow-hidden">
      <Image src="/map-background.jpg" alt="Map Background" layout="fill" objectFit="cover" />
      {mapPoints.map((point) => (
        <motion.div
          key={point.id}
          className={`absolute w-8 h-8 rounded-full cursor-pointer ${
            completedPoints.includes(point.id) ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handlePointClick(point)}
        />
      ))}
      {activePoint && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <Image
              src={activePoint.imageUrl || "/placeholder.svg"}
              alt="Clue Image"
              width={400}
              height={300}
              className="rounded-lg mb-4"
            />
            <p className="text-lg mb-4">{activePoint.prompt}</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-4"
                placeholder="Type your answer here..."
              />
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-red-600 transition duration-300"
              >
                Submit Answer
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  )
}

