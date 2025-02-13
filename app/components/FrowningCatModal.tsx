import { motion } from "framer-motion"

interface FrowningCatModalProps {
  isVisible: boolean
  onClose: () => void
}

export default function FrowningCatModal({ isVisible, onClose }: FrowningCatModalProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
      onClick={onClose}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <motion.div
        initial={{ scale: 0.5, y: -100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: -100 }}
        className="bg-white p-4 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Oops! That's not correct.</h2>
        <img
          src="https://media.giphy.com/media/JER2en0ZRiGUE/giphy.gif"
          alt="Frowning cat"
          className="w-64 h-64 object-cover rounded-lg"
        />
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 w-full"
        >
          Try Again
        </button>
      </motion.div>
    </motion.div>
  )
}

