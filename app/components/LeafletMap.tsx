"use client"

import { useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Red marker icon for undiscovered points
const redIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 28C16 28 28 20 28 12C28 7 24 4 20 4C17.5 4 16 6 16 6C16 6 14.5 4 12 4C8 4 4 7 4 12C4 20 16 28 16 28Z" fill="#FC4C4E"/>
      <path d="M16 24C16 24 24 18 24 12C24 9 21.5 7 19 7C17.5 7 16 8.5 16 8.5C16 8.5 14.5 7 13 7C10.5 7 8 9 8 12C8 18 16 24 16 24Z" fill="#F699CD"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 28],
  popupAnchor: [0, -28],
})

// Green marker icon for discovered points
const greenIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 28C16 28 28 20 28 12C28 7 24 4 20 4C17.5 4 16 6 16 6C16 6 14.5 4 12 4C8 4 4 7 4 12C4 20 16 28 16 28Z" fill="#22C55E"/>
      <path d="M16 24C16 24 24 18 24 12C24 9 21.5 7 19 7C17.5 7 16 8.5 16 8.5C16 8.5 14.5 7 13 7C10.5 7 8 9 8 12C8 18 16 24 16 24Z" fill="#86EFAC"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 28],
  popupAnchor: [0, -28],
})

type MapPoint = {
  id: string
  location: string
  position: [number, number]
  description: string
  image: string
}

interface LeafletMapProps {
  mapPoints: MapPoint[]
  onComplete: () => void
  onQuestionAnswered: (locationId: string) => void
  answeredQuestions: string[]
}

const locations = [
  { name: "Seattle, WA", coords: [47.6062, -122.3321] as [number, number] },
  { name: "Tokyo, Japan", coords: [35.6762, 139.6503] as [number, number] },
  { name: "Vancouver, BC", coords: [49.2827, -123.1207] as [number, number] },
]

export default function LeafletMap({ mapPoints, onComplete, onQuestionAnswered }: LeafletMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<MapPoint | null>(null)
  const [discoveredLocations, setDiscoveredLocations] = useState<string[]>([])
  const mapRef = useRef<L.Map | null>(null)

  const handleConfirmLocation = (point: MapPoint) => {
    onQuestionAnswered(point.id)
    setDiscoveredLocations(prev => [...new Set([...prev, point.id])])
    setSelectedLocation(null)
    mapRef.current?.closePopup()
  }

  const flyToLocation = (coords: [number, number]) => {
    mapRef.current?.flyTo(coords, 12, {
      duration: 2
    })
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-5/6">
        <MapContainer
          center={[47.6062, -122.3321]}
          zoom={10}
          scrollWheelZoom={true}
          style={{ height: '1000px', width: '100%' }}
          ref={mapRef}
          className="[&_.leaflet-popup-content-wrapper]:!w-auto [&_.leaflet-popup-content]:!w-auto [&_.leaflet-popup-content]:!m-0 items-center justify-center justify-items-center snap-center"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapPoints.map((point) => (
            <Marker
              key={point.id}
              position={point.position}
              icon={discoveredLocations.includes(point.id) ? greenIcon : redIcon}
              eventHandlers={{
                click: () => setSelectedLocation(point),
              }}
            >
              <Popup>
                <div className="w-96 flex flex-col items-center justify-center p-4">
                  <h3 className="font-bold mb-2 text-lg">{point.location}</h3>
                  <Image
                    src={point.image}
                    alt={point.location}
                    width={500}
                    height={500}
                    className="rounded-lg mb-2"
                  />
                  <p className="text-sm mb-4">{point.description}</p>
                  <button
                    onClick={() => handleConfirmLocation(point)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full w-full hover:bg-red-600 transition duration-300"
                  >
                    Mark as Discovered
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="mt-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {locations.map((loc) => (
              <motion.button
                key={loc.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => flyToLocation(loc.coords)}
                className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition duration-300"
              >
                Travel to {loc.name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

