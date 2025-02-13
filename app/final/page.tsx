"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Confetti from "react-confetti"
import { FaHeart } from "react-icons/fa"
import Image from "next/image"

export default function Final() {
  const [showConfetti, setShowConfetti] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-pink-100">
      {showConfetti && <Confetti />}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-red-600">Happy Valentine's Day my little Cutie Patootie</h2>
        <div className="relative w-full h-96 mb-4">
          <Image
            src="/images/valentines/rat-chef.jpg"
            alt="Final Surprise"
            fill
            className="rounded-lg object-contain"
          />
        </div>
        <p className="text-xl mb-6">
          I hope you enjoyed this little project. I love you so so so much. Here's to creating many more memories together! (maybe I can continue adding to this website in the future LOL)
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition duration-300"
          onClick={() => setShowConfetti(true)}
        >
          Yay! wiwiwiwiwi <FaHeart className="inline-block ml-2" />
        </motion.button>
      </motion.div>
    </main>
  )
}

