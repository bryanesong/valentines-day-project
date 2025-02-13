"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface ShopItem {
  id: string
  name: string
  cost: number
  description: string
}

const shopItems: ShopItem[] = [
  { id: "1", name: "Virtual Flower", cost: 50, description: "A beautiful digital flower for your loved one." },
  { id: "2", name: "Love Poem", cost: 100, description: "A heartfelt poem written just for you." },
  { id: "3", name: "Digital Date Night", cost: 200, description: "A special online date night experience." },
]

interface PointSystemProps {
  points: number
  onSpendPoints: (amount: number) => void
}

export default function PointSystem({ points, onSpendPoints }: PointSystemProps) {
  const [showShop, setShowShop] = useState(false)
  const [purchasedItems, setPurchasedItems] = useState<string[]>([])

  const handlePurchase = (item: ShopItem) => {
    if (points >= item.cost) {
      onSpendPoints(item.cost)
      setPurchasedItems([...purchasedItems, item.id])
      alert(`You've purchased: ${item.name}!`)
    } else {
      alert("You don't have enough points for this item!")
    }
  }

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-md">
      <motion.div initial={{ scale: 1 }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.3 }}>
        <p className="text-2xl font-bold text-red-600 mb-2">Points: {points}</p>
      </motion.div>
      <button
        onClick={() => setShowShop(!showShop)}
        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
      >
        {showShop ? "Close Shop" : "Open Shop"}
      </button>
      {showShop && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Love Shop</h3>
          {shopItems.map((item) => (
            <div key={item.id} className="mb-2 p-2 border rounded">
              <p className="font-bold">
                {item.name} - {item.cost} points
              </p>
              <p>{item.description}</p>
              <button
                onClick={() => handlePurchase(item)}
                disabled={purchasedItems.includes(item.id) || points < item.cost}
                className={`mt-2 px-3 py-1 rounded ${
                  purchasedItems.includes(item.id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : points < item.cost
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                } text-white transition duration-300`}
              >
                {purchasedItems.includes(item.id) ? "Purchased" : "Buy"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

