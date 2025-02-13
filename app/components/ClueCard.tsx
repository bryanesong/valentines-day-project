import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface ClueCardProps {
  title: string
  imageUrl: string
  clueText: string
  nextClue: string
}

export default function ClueCard({ title, imageUrl, clueText, nextClue }: ClueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-red-600">{title}</h2>
      <div className="relative w-full h-64 mb-4">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Clue Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <p className="text-lg mb-6 text-center">{clueText}</p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="text-center">
        <Link
          href={nextClue}
          className="bg-red-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-red-600 transition duration-300"
        >
          Next Clue
        </Link>
      </motion.div>
    </motion.div>
  )
}

