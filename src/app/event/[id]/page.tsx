import EventDetails from '@/components/EventDetails'
import { getEventById } from '@/services/eventServices'
import React from 'react'


export const Page = async({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const id =   (await params).id
  const eventData = await getEventById(id)
  console.log("aqui")
  console.log(eventData)
  return (
    <div className={'pt-12'}>
        <EventDetails event={eventData.data.attributes} />
    </div>
  )
}

export default Page 