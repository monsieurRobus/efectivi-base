import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Event } from '@/types/event';
import { Lock, LockOpen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface EventsTableProps {
  events: Event[];
}


export function EventsTable({ events=[] }: EventsTableProps) {

  const router = useRouter();

  const handleClick = (e:any,id:string)=>{
    console.log(e)
    router.push(`/event/${id}`)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead><Lock /></TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Fecha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow onClick={(id)=>handleClick} data-id={event.id} className={'hover:bg-slate-200 cursor-pointer'} key={event.id}>
              
              <TableCell>{event.id}</TableCell>
              <TableCell>{event.attributes.Private ? <Lock color='#8f0000' /> : <LockOpen color='#05ff37' /> }</TableCell>
              <TableCell>{event.attributes.Type}</TableCell>
              <TableCell>{event.attributes.Title}</TableCell>
              <TableCell>{event.attributes.Date}</TableCell>
            
            </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

