import ClueCard from "../components/ClueCard"

export default function Clue2() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-pink-100">
      <ClueCard
        title="Our Favorite Song"
        imageUrl="/placeholder.svg?height=300&width=400"
        clueText="What's the song that always makes us dance? Listen closely for the next clue!"
        nextClue="/clue3"
      />
    </main>
  )
}

