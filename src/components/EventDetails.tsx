'use client'

import { useCallback, useEffect, useState, useMemo } from 'react'
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, DirectionsService } from '@react-google-maps/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, MapPinIcon, UsersIcon, ClockIcon, BanknoteIcon, Map } from 'lucide-react'
import { getDistanceValue, getMonth, getWeekDay } from '@/lib/utils'

interface EventDetailsProps {
  event: {
    id: string
    Title: string
    description: string
    Date: string
    Private: boolean
    time: string
    Location: {
      coordinates: {
        lat: number
        lng: number
      }
      address: string
      geohash: string
    }
    attendees: number
    price: number
    organizer: string
  }
}

const fixedLocation = { lat: 39.0286166590369, lng: -1.8883300711425557 } // Madrid como ubicación fija

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
  const [distance, setDistance] = useState<number>(0)
  const [costTravel, setCostTravel] = useState<number>(0)
  const newDate = new Date(event.Date);
  const directionsCallback = useCallback((result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === 'OK' && result) {
      setDirections(result);
    } else {
      console.error('Error al obtener direcciones:', status);
    }
  },[])

  const directionsOptions = useMemo(() => ({
    origin: fixedLocation,
    destination: event.Location.coordinates,
    travelMode: 'DRIVING',
    
  }), [fixedLocation, event.Location.coordinates]);

  useEffect(() => {

    const distanceRaw = directions?.routes[0]?.legs[0]?.distance?.value ?? 0;
    const distanceKM = (distanceRaw*2)/1000
    setDistance(distanceKM)
    
    setCostTravel(()=>getDistanceValue(distanceKM))
  },[directions])

  return (
    <div>      
      <div className="grid p-2 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <div className={'flex flex-row gap-2'}>
              {event.Private ? <Badge variant={'destructive'}>Privado</Badge> : <Badge variant={'secondary'}>Público</Badge>}
              <CardTitle className="text-2xl font-bold">{event.Title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className={'flex flex-row gap-4'}>
              <div className={'flex flex-row '}>
                <CalendarIcon className="w-6 h-6 mr-2" /><span>{getWeekDay(newDate.getDay())} {newDate.getDate()} de {getMonth(newDate.getMonth())}, {newDate.getFullYear()} </span>
              </div>
              <div className={'flex flex-row '}>
                <MapPinIcon className="w-6 h-6 mr-2" /><span>{event.Location.address?? ''}</span>
              </div>
              <div className={'flex flex-row '}>
                
              </div>
              
            </div>
          </CardContent>
        </Card>        
        <Card>
          <CardHeader>
            <CardTitle>Ubicación y Distancia</CardTitle>
          </CardHeader>
          <CardContent>
            
            <>
            <div className="h-64 mb-4">
              <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!}>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={event.Location.coordinates}
                  zoom={10}
                  options={{
                    disableDefaultUI: true,
                    draggable: false,
                    zoomControl: false,
                    scrollwheel: false,
                    disableDoubleClickZoom: true, 
                  }}
                  >
                  <Marker position={fixedLocation} />
                  <Marker position={event.Location.coordinates} />
                  <DirectionsService
                      options={directionsOptions}
                      callback={directionsCallback}
                      />
                  {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
              </LoadScript>
            </div>                 
            </>
            
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Evento</CardTitle>
          </CardHeader>
          <CardContent>
          <div>
              {directions && (
                <div className="text-md text-muted-foreground">
                  <p><span className={'font-semibold'}>Distancia:</span> {directions.routes[0].legs[0].distance?.text}</p>
                  <p><span className={'font-semibold'}>Ida y vuelta:  </span>{(directions?.routes[0]?.legs[0]?.distance?.value) ? ((directions?.routes[0]?.legs[0]?.distance?.value)*2)/1000 : 0} km</p>
                  <p><span className={'font-semibold'}>Tiempo estimado ida/vuelta:</span> {directions.routes[0].legs[0].duration?.text} </p>
                  <h3 className={'text-3xl'}>Coste viaje</h3> 
                  <p><span className={'font-semibold text-2xl'}>{costTravel} €</span></p>
                </div>
              )}

            </div>   
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EventDetails
