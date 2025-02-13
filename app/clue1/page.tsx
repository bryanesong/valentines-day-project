import ClueCard from "../components/ClueCard"

export default function Clue1() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-pink-100">
      <ClueCard
        title="Our First Date"
        imageUrl="/placeholder.svg?height=300&width=400"
        clueText="Remember where we had our first date? That's where you'll find the next clue!"
        nextClue="/clue2"
      />
    </main>
  )
}

