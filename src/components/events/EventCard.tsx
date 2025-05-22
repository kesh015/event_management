import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card, { CardMedia, CardContent, CardFooter } from '../common/Card';
import Button from '../common/Button';
import { Event } from '../../types/event';
import { formatDate } from '../../utils/dateUtils';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card hoverable className="h-full flex flex-col">
      <Link to={`/events/${event.id}`}>
        <CardMedia 
          src={event.image} 
          alt={event.title} 
          height="h-48"
        />
      </Link>
      <CardContent className="flex-grow">
        <div className="flex items-start justify-between">
          <div className="bg-[#CF2D2D] bg-opacity-10 text-[#CF2D2D] text-xs font-medium px-2.5 py-0.5 rounded">
            {event.category}
          </div>
          <div className="text-[#989090] text-sm">
            {event.isFeatured && <span className="font-medium">Featured</span>}
          </div>
        </div>
        
        <Link to={`/events/${event.id}`}>
          <h3 className="mt-2 text-lg font-semibold text-[#1E2022] line-clamp-2 hover:text-[#CF2D2D] transition-colors">
            {event.title}
          </h3>
        </Link>
        
        <p className="mt-1 text-[#989090] text-sm line-clamp-2">
          {event.description}
        </p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-[#1E2022]">
            <Calendar className="h-4 w-4 text-[#989090] mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-[#1E2022]">
            <Clock className="h-4 w-4 text-[#989090] mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-[#1E2022]">
            <MapPin className="h-4 w-4 text-[#989090] mr-2" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          {event.attendees && (
            <div className="flex items-center text-sm text-[#1E2022]">
              <Users className="h-4 w-4 text-[#989090] mr-2" />
              <span>{event.attendees} attendees</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="mt-auto">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold text-[#1E2022]">
            {event.price === 0 ? 'Free' : `$${event.price}`}
          </div>
          <Link to={`/events/${event.id}`}>
            <Button variant="primary" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;