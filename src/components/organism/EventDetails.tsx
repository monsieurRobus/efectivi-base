'use client'

import { useCallback, useEffect, useState, useMemo, useRef } from 'react'
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, DirectionsService, useJsApiLoader } from '@react-google-maps/api'
import { PDFViewer } from '@react-pdf/renderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, MapPinIcon, UsersIcon, ClockIcon, BanknoteIcon, Map, Clock, Pencil } from 'lucide-react'
import { getDistanceValue, getMonth, getWeekDay } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '../ui/button'
import { setEventTime } from '@/services/eventServices'
import { InvoiceForm } from './invoice-form'
import { InvoicePDF } from './invoice-pdf';


interface EventDetailsProps {
  eventData: {
    id: string
    Title: string
    description: string
    Date: string
    Time: string
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

const EventDetails: React.FC<EventDetailsProps> = ({ eventData }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
  });

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [costTravel, setCostTravel] = useState<number>(0);
  const [editTime, setEditTime] = useState<boolean>(false);
  const [event, setEventData] = useState(()=>eventData);
  const [invoiceData, setInvoiceData] = useState<FormData>(null)
  const newDate = new Date(event.Date);
  const timeComponent = useRef<HTMLInputElement>(null);
  console.log(event.id)
  const directionsCallback = useCallback((result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === 'OK' && result) {
      setDirections(result);
    } else {
      console.error('Error al obtener direcciones:', status);
    }
  },[])


  // Aqui llamaremos al endpoint para editar el evento y cambiar la hora.
  const handleChangeTime = ()=>{

    const time = timeComponent.current?.value;

    return setEventTime(event.id, time ?? '00:00').then(response => 
      {
        if(response.status===200){
          console.log(response)
          setEditTime(()=>false);  
          setEventData({...event, Time: response.data.attributes.Time})     
          if(timeComponent.current) timeComponent.current.value = response.data.attributes.Time
        }
      }
      )
  }

    const handlePDFGenerate = (data: InvoiceData) => {
      setInvoiceData(data);
    };
  

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
      <div className="grid p-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className={'flex flex-col md:flex-col lg:flex-row gap-2 '}>
              {event.Private ? <Badge variant={'destructive'}>Privado</Badge> : <Badge variant={'secondary'}>Público</Badge>}
              <CardTitle className="text-2xl font-bold">{event.Title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className={'flex flex-col md:flex-row gap-4 '}>
              <div className={'flex flex-row '}>
                <CalendarIcon className="w-6 h-6 mr-2" /><span>{getWeekDay(newDate.getDay())} {newDate.getDate()} de {getMonth(newDate.getMonth())}, {newDate.getFullYear()} </span>
              </div>
              <div className={'flex flex-row '}>
                <MapPinIcon className="w-6 h-6 mr-2" /><span>{event.Location.address?? ''}</span>
              </div>
              <div className={'flex flex-row items-center justify-center'}>
                <Clock  className="w-6 h-6 mr-2"/>{editTime?<div className={'flex flex-col md:flex-row gap-2 justify-center items-center'}><input className={' h-6 mr-2'} ref={timeComponent} type={'time'} defaultValue={event.Time}/><Button className={' h-6 mr-2'} onClick={()=>handleChangeTime()}>Save</Button ></div>:<div className={'flex flex-col md:flex-row gap-2'}><span>{event.Time.substring(0,5)}</span><Pencil onClick={()=>setEditTime(()=>true)}/></div>}
              </div>
              
            </div>
          </CardContent>
        </Card>      
        <Tabs defaultValue="mapa" >
          <TabsList className='w-full'>
            <TabsTrigger value="mapa">Mapa</TabsTrigger>
            <TabsTrigger value="detalles">Detalles</TabsTrigger>
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
          </TabsList>
          <TabsContent value="mapa">
          <Card className='h-96'>
            <CardHeader>
              <CardTitle>Ubicación y Distancia</CardTitle>
            </CardHeader>
            <CardContent>
              
              <>
              <div className="h-64 mb-4">
                
                  {isLoaded ? <GoogleMap
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
                  </GoogleMap>:<p>Cargando...</p>}
                
              </div>                 
              </>
              
            </CardContent>
          </Card>
          </TabsContent>
          <TabsContent value="detalles">
            <Card className='h-96'>
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
          </TabsContent>
          <TabsContent value="resumen">
            <Card className='h-96'>
              <CardHeader>
                <CardTitle>Resumen del Evento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={'flex flex-col gap-4'}>
                  <div className={'flex flex-row gap-4'}>
                    <UsersIcon className="w-6 h-6 mr-2" /><span>{event.attendees} asistentes</span>
                  </div>
                  <div className={'flex flex-row gap-4'}>
                    <BanknoteIcon className="w-6 h-6 mr-2" /><span>{event.price} €</span>
                  </div>
                </div>
              </CardContent>
              </Card>
          </TabsContent>
        </Tabs>  
        <Tabs defaultValue='factura' className={'col-span-2'}>
          <TabsList className='w-full'>
            <TabsTrigger value="factura">Factura</TabsTrigger>
            <TabsTrigger value="vista">Vista Previa</TabsTrigger>
          </TabsList>
          <TabsContent value='factura'>
                  <Card className='h-fit'>
                    <CardHeader>
                      <CardTitle>Generador Facturas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <InvoiceForm onSubmit={handlePDFGenerate}/>
                    </CardContent>
                  </Card>
          </TabsContent>
          <TabsContent value='vista'>
                  <Card className='h-fit'>
                    <CardHeader>
                      <CardTitle>Generador Facturas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardContent>
                        
                                  {invoiceData && (
                                    <PDFViewer width="100%" height={600}>
                                      <InvoicePDF data={invoiceData} />
                                    </PDFViewer>
                                  )}
                                </CardContent>
                    </CardContent>
                  </Card>
          </TabsContent>
        </Tabs>
        
        
      </div>
    </div>
  )
}

export default EventDetails

