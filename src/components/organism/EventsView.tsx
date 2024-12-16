'use client'

import React, { useState, useEffect } from 'react';
import { EventsTable } from '../molecules/EventsTable';
import { Pagination } from '../molecules/Pagination';
import { Event } from '@/types/event';
import { getAllEvents } from '@/services/eventServices';

export function EventsView() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        const response = await getAllEvents();
        setEvents(response.data);
        setTotalPages(response.meta.pagination.pageCount);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEvents();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div className="text-center py-4">Cargando eventos...</div>;
  }

  return (
    <div className="space-y-4 pt-12">
      <EventsTable events={events} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
1

