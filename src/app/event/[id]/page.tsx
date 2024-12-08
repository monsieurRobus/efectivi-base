import EventDetails from '@/components/organism/EventDetails'
import { getEventById } from '@/services/eventServices'
import React from 'react'


export const Page = async({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const id =   (await params).id
  const eventData = await getEventById(id)
  return (
    <div className={'pt-12 w-full'}>
        <EventDetails eventData={{...eventData.data.attributes,id:id}} />
    </div>
  )
}

export default Page 