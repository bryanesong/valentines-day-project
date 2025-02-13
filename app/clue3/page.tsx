import ClueCard from "../components/ClueCard"

export default function Clue3() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-pink-100">
      <ClueCard
        title="Our Dream Vacation"
        imageUrl="/placeholder.svg?height=300&width=400"
        clueText="We've always talked about visiting this place. Imagine us there for the final clue!"
        nextClue="/final"
      />
    </main>
  )
}

