"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaHeart } from "react-icons/fa"
import dynamic from "next/dynamic"
import Image from "next/image"

const LeafletMap = dynamic(() => import("./components/LeafletMap"), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-gray-100 animate-pulse"></div>
})

const mapPoints = [
  {
    id: "1",
    location: "Silly in Sapporo (Jozankei but same thing)",
    position: [42.97163976726324, 141.17085258414525] as [number, number],
    description: "I love how you can be so unserious and funny at times. You always are able to make me laugh and I love that about you. This photo is basically how we are with each other...!",
    image: "/images/valentines/silly-photo.jpg",
  },
  {
    id: "12",
    location: "Shopping in Tokyo!",
    position: [35.678368904859646, 139.72982148048365] as [number, number],
    description: "Experiencing the urban environment of Japan was so much fun! I love spending time with you and exploring the city together (even if it costs a lot of $$$ :( ). This was one of the best experiences I have ever had and I can't wait to do more in the future! There were too many photos to choose from for this one but I liked this one because it was very representative of our time in Tokyo (shopping...).",
    image: "/images/valentines/japan-shopping.jpg",
  },
  {
    id: "13",
    location: "Relaxing in Ryokans",
    position: [43.063287491110884, 141.33541932953196] as [number, number],
    description: "Something I really love about you is when I spend time with you, I can feel very relaxed (most of the time...). Whether it be spending a lazy Sunday inside and napping, or going on a spontaneous adventure to sit at a cafe to talk, I always feel like I can be myself around you.",
    image: "/images/valentines/ryokan-photo.jpg",
  },
  {
    id: "14",
    location: "Photo Phanatic!",
    position: [35.77347096822386, 139.7600379801493] as [number, number],
    description: "I love how you always encourage me to take photos of us to remember our moments together! Usually I am either shy or I just simply forget to take photos, but I love being able to look back on these moments we have together. It also helps a lot when making things like this LOL.",
    image: "/images/valentines/memories-photo.png",
  },
  {
    id: "2",
    location: "Mini Golfing!",
    position: [49.2827, -123.1207] as [number, number],
    description: "I love how open minded and adventerous you are. You are always willing to try new things whether it be food or activities. Going to new places, trying new foods together, is some of the most fun we have together.",
    image: "/images/valentines/canada1-photo.jpg",
  },
  {
    id: "22",
    location: "Kitoki Inn",
    position: [49.38334110354167, -123.34225312278078] as [number, number],
    description: "One thing I really love aobut you is how I can talk to you about anything and everything. Whether it be about what which cat you would be in another lif,e or whether nuture or nature plays a larger effect in ones upbringing, it is always so much fun to talk to you!",
    image: "/images/valentines/kitoki-photo.jpg",
  },
  {
    id: "31",
    location: "Photos in the Park",
    position: [47.597643786975596, -122.05976671090069] as [number, number],
    description: "I love how you are always so supportive of me in my career and my hobbies. You always encourag me to take photos and give me lots of words of affirmation. Thank you for giving me the confidence in everything I do and for always being there for me.",
    image: "/images/valentines/park-photo.jpg",
  },
  {
    id: "32",
    location: "Green Lake Picnic Party",
    position: [47.68365151329363, -122.32986124362566] as [number, number],
    description: "Your personality is something that I find so unique and love so much about you. Spending time with you is like getting a warm hug. You always make me feel so comfortable and at ease.",
    image: "/images/valentines/picnic.jpg",
  },
  {
    id: "33",
    location: "Visiting the OG Gang",
    position: [48.288481222776866, -122.65894708205134] as [number, number],
    description: "I love how you value family a lot. Although our family dynamics are very different, the way I see you treat your family is something I really admire and something I look up to you for.",
    image: "/images/valentines/gabrielle-parent-house.jpg",
  },
  {
    id: "34",
    location: "Christmas in the City",
    position: [47.59104519164058, -122.33298107345585] as [number, number],
    description: "One thing I love about you and look up to you is your work ethic. Even after long tiring days of working, you're always able to make time for me. Your persistence towards your goals is something I also strive for in my personal life. Watching you suceed and reap the benefits from your hard work is very motivating for me.",
    image: "/images/valentines/christmas-heart.jpg",
  }
]

const locationGroups = {
  "Washington": ["Photos in the Park", "Green Lake Picnic Party", "Visiting the OG Gang", "Christmas in the City"],
  "Japan": ["Silly in Sapporo (Jozankei but same thing)","Shopping in Tokyo!","Relaxing in Ryokans","Photo Phanatic!"],
  "Canada": ["Mini Golfing!", "Kitoki Inn"]
} as const;

const getLocationStats = (points: typeof mapPoints, answered: string[]) => {
  // First calculate stats per location as before
  const locationStats = points.reduce((acc, point) => {
    acc[point.location] = acc[point.location] || { total: 0, answered: 0 };
    acc[point.location].total += 1;
    if (answered.includes(point.id)) {
      acc[point.location].answered += 1;
    }
    return acc;
  }, {} as Record<string, { total: number; answered: number }>);

  // Then aggregate by group
  const groupStats = Object.entries(locationGroups).reduce((acc, [group, locations]) => {
    acc[group] = locations.reduce((groupAcc, location) => {
      if (locationStats[location]) {
        groupAcc.total += locationStats[location].total;
        groupAcc.answered += locationStats[location].answered;
      }
      return groupAcc;
    }, { total: 0, answered: 0 });
    return acc;
  }, {} as Record<string, { total: number; answered: number }>);

  return groupStats;
};

const catPhotos = [
  "/images/cute_cat_photos/cute1.jpg",
  "/images/cute_cat_photos/cute2.jpg",
  "/images/cute_cat_photos/cute3.jpg",
  "/images/cute_cat_photos/cute4.jpg",
  // Add more cat photos as needed
]

const FloatingCatPhotos = () => {
  return (
    <div className="absolute inset-x-0 top-20 h-64 overflow-hidden pointer-events-none">
      {/* Left side cats */}
      {catPhotos.slice(0, 2).map((photo, index) => {
        const xPosition = 5 + (index * 15) // 15% and 30% from left
        
        return (
          <motion.div
            key={`left-${photo}`}
            className="absolute"
            initial={{ 
              x: `${xPosition}%`, 
              y: index % 2 === 0 ? -20 : 20,
              rotate: Math.random() * 20 - 10
            }}
            animate={{
              y: [index % 2 === 0 ? -20 : 20, index % 2 === 0 ? 20 : -20],
              rotate: [Math.random() * 20 - 10, Math.random() * 20 - 10]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{
              left: `calc(${xPosition}% - 60px)`
            }}
          >
            <Image
              src={photo}
              alt="Cute cat"
              width={200}
              height={200}
              className="rounded-lg shadow-lg opacity-70 hover:opacity-100 transition-opacity"
              priority
            />
          </motion.div>
        )
      })}

      {/* Right side cats */}
      {catPhotos.slice(2, 4).map((photo, index) => {
        const xPosition = 70 + (index * 15) // 70% and 85% from left
        
        return (
          <motion.div
            key={`right-${photo}`}
            className="absolute"
            initial={{ 
              x: `${xPosition}%`, 
              y: index % 2 === 0 ? -20 : 20,
              rotate: Math.random() * 20 - 10
            }}
            animate={{
              y: [index % 2 === 0 ? -20 : 20, index % 2 === 0 ? 20 : -20],
              rotate: [Math.random() * 20 - 10, Math.random() * 20 - 10]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{
              left: `calc(${xPosition}% - 60px)`
            }}
          >
            <Image
              src={photo}
              alt="Cute cat"
              width={120}
              height={120}
              className="rounded-lg shadow-lg opacity-70 hover:opacity-100 transition-opacity"
              priority
            />
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Home() {
  const [huntStarted, setHuntStarted] = useState(false)
  const [huntCompleted, setHuntCompleted] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([])

  useEffect(() => {
    console.log('Answered Questions:', answeredQuestions)
    console.log('Total Map Points:', mapPoints.length)
    console.log('Hunt Completed State:', huntCompleted)
    
    if (answeredQuestions.length >= mapPoints.length) {
      console.log('Setting hunt completed to true')
      setHuntCompleted(true)
    }
  }, [answeredQuestions])

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setHuntStarted(true)
    } else {
      alert("Oops! Try again, my love!")
    }
  }

  const handleQuestionAnswered = (locationId: string) => {
    console.log('Question answered:', locationId)
    setAnsweredQuestions(prev => {
      const newAnswered = [...new Set([...prev, locationId])]
      console.log('New answered questions:', newAnswered)
      return newAnswered
    })
  }

  if (!huntStarted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-pink-100 relative">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-64 h-64 mx-auto rounded-full overflow-hidden bg-pink-200 flex items-center justify-center"
            >
              <Image
                src="/images/valentines/cat-oiiaoiia-cat.gif"  // Replace with your GIF path in the public folder
                alt="Valentine's Day GIF"
                width={256}
                height={256}
                className="object-cover w-full h-full"
                priority
              />
            </motion.div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-red-600">Happy Valentine's Day!</h1>
          <p className="text-2xl mb-8">Will you be my valentine?</p>
          <div className="relative w-[300px] mx-auto">
            <Image
                src="/images/valentines/do-you-like-me.jpg"
                alt="Valentine's Day GIF"
                width={100}
                height={100}
                className="object-cover w-[300px] h-[300px]"
                priority
              />
            <div className="absolute bottom-24 left-0 right-0 flex justify-center space-x-32">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#FC4C4E] text-white w-24 h-24 rounded-3xl text-lg font-semibold hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                onClick={() => handleAnswer(true)}
              >
                Yes
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#F699CD] text-white w-24 h-24 rounded-3xl text-lg font-semibold hover:bg-red-600 transition duration-300 flex items-center justify-center"
                onClick={() => handleAnswer(true)}
              >
                Yes
              </motion.button>
            </div>
          </div>
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
          }}
          className="absolute bottom-10 text-red-500 text-4xl"
        >
          <FaHeart />
        </motion.div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-pink-100 relative">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-4"
      >
        <h1 className="text-3xl font-bold mb-2 text-red-600">Our Memory Map</h1>
        <p className="text-lg mb-4">There are so many things I love about you, but I've chosen my top 10 to let you find!</p>
        
        <div className="w-full max-w-4xl mx-auto mb-4">
          <div className="mb-4">
            <p className="text-lg font-semibold text-red-600">
              Progress: {answeredQuestions.length}/{mapPoints.length} Locations Discovered
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-red-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${(answeredQuestions.length / mapPoints.length) * 100}%` }}
            />
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            {Object.entries(getLocationStats(mapPoints, answeredQuestions)).map(([group, stats]) => (
              <div key={group} className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  stats.answered === stats.total ? 'bg-red-500' : 'bg-gray-300'
                }`} />
                <span>
                  {group} ({stats.answered}/{stats.total})
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <FloatingCatPhotos />
      
      <div className="w-full max-w-full mt-16">
        <LeafletMap 
          mapPoints={mapPoints} 
          onComplete={() => setHuntCompleted(true)} 
          onQuestionAnswered={handleQuestionAnswered} 
          answeredQuestions={answeredQuestions}
        />
      </div>

      {huntCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 max-w-md mx-4 relative shadow-2xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="w-24 h-24 mx-auto mb-6"
              >
                <Image
                  src="/images/valentines/cat-oiiaoiia-cat.gif"
                  alt="Celebration"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
              <h2 className="text-2xl font-bold mb-4 text-red-600">
                Congratulations! You did it!
              </h2>
              <p className="text-gray-600 mb-6">
                You've discovered all our special memories together. Ready for your surprise?
              </p>
              <motion.a
                href="/final"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-600 transition duration-300 shadow-lg"
              >
                See Your Surprise ❤️
              </motion.a>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  )
}

