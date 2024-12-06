'use client'

import { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, MapPinIcon, UsersIcon, ClockIcon, BanknoteIcon } from 'lucide-react'

interface EventDetailsProps {
  event: {
    id: string
    title: string
    description: string
    Date: string
    time: string
    Location: {
      name: string
      lat: number
      lng: number
    }
    attendees: number
    price: number
    organizer: string
  }
}

const fixedLocation = { lat: 40.416775, lng: -3.703790 } // Madrid como ubicación fija

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
  console.log(event)
  useEffect(() => {
    const directionsService = new google.maps.DirectionsService()

    directionsService.route(
      {
        origin: fixedLocation,
        destination: event.Location,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result)
        }
      }
    )
  }, [event.Location])

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{event.title}</CardTitle>
          <Badge variant="secondary">{event.organizer}</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{event.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalles del Evento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="text-muted-foreground" />
              <span>{event.Date}</span>
            </div>
            {/* <div className="flex items-center space-x-2">
              <ClockIcon className="text-muted-foreground" />
              <span>{event.time}</span>
            </div> */}
            <div className="flex items-center space-x-2">
              <MapPinIcon className="text-muted-foreground" />
              <span>{event.Location.name}</span>
            </div>
            {/* <div className="flex items-center space-x-2">
              <UsersIcon className="text-muted-foreground" />
              <span>{event.attendees} asistentes</span>
            </div> */}
            {/* <div className="flex items-center space-x-2">
              <BanknoteIcon className="text-muted-foreground" />
              <span>{event.price} €</span>
            </div> */}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ubicación y Distancia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 mb-4">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={event.Location}
                zoom={10}
              >
                <Marker position={fixedLocation} />
                <Marker position={event.Location} />
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
            </LoadScript>
          </div>
          {directions && (
            <div className="text-sm text-muted-foreground">
              <p>Distancia: {directions.routes[0].legs[0].distance?.text}</p>
              <p>Tiempo estimado: {directions.routes[0].legs[0].duration?.text}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default EventDetails

