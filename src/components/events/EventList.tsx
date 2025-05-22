import React from 'react';
import EventCard from './EventCard';
import { Event } from '../../types/event';

interface EventListProps {
  events: Event[];
  title?: string;
  className?: string;
}

const EventList: React.FC<EventListProps> = ({ events, title, className = '' }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-[#989090]">No events found.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl font-semibold text-[#1E2022] mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;