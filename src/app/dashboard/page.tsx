import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter} from '@/components/atoms/card'
import { getDashboardData } from '@/services/dashboardServices'
import ProtectedLayout from '@/context/ProtectedLayout'
import React from 'react'
import { LineChart } from '@/components/organism/LineChart'

type PageProps = {}

const page = async (props: PageProps) => {

    const data = await getDashboardData();  
    const songQuantity = data.songs;
    const setlistQuantity = data.setlists;
    const eventsQuantity = data.events;
    const eventList = data.eventList;

  return (
    <ProtectedLayout>
        <main className={'grid gap-2 md:grid-cols-3 lg:grid-cols-3'}>
            <Card>
                <CardHeader>
                    <CardTitle>Canciones</CardTitle>
                    <CardDescription>Canciones existentes en la base de datos</CardDescription>
                </CardHeader>
                <CardContent>
                    <h1 className={'text-6xl'}>{songQuantity}</h1>
                </CardContent>                
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Setlists activos</CardTitle>
                    <CardDescription>Setlist creados para diferentes eventos</CardDescription>
                </CardHeader>
                <CardContent>
                    <h1 className={'text-6xl'}>{setlistQuantity}</h1>
                </CardContent>                
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Eventos activos</CardTitle>
                    <CardDescription>Eventos contratados restantes por hacer</CardDescription>
                </CardHeader>
                <CardContent>
                    <h1 className={'text-6xl'}>{eventsQuantity}</h1>
                </CardContent>                
            </Card>
            <Card className={'col-span-3'}>
                <CardHeader>
                    <CardTitle>Próximo evento</CardTitle>
                    <CardDescription>Resumen del próximo evento a realizar</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className={'flex flex-row'}>
                        <div className={'flex flex-col'}>
                            <h1 className={'text-4xl'}>
                                {eventList[0].Title}
                            </h1>
                            <h2 className={'text-2xl'}>{eventList[0].Type}</h2>
                        </div>

                    </div>
                </CardContent>                
            </Card>

        </main>
    </ProtectedLayout>
  )
}

export default page