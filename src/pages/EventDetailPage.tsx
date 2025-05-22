import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Share2, Heart, ChevronLeft } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import Card, { CardContent } from '../components/common/Card';
import { Event } from '../types/event';
import { fetchEventById, fetchEvents } from '../services/api';
import { formatDate } from '../utils/dateUtils';
import { useAuth } from '../context/AuthContext';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    const loadEvent = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const eventData = await fetchEventById(id);
        setEvent(eventData);
        
        // Fetch related events (same category)
        const allEvents = await fetchEvents();
        const related = allEvents
          .filter(e => e.id !== id && e.category === eventData.category)
          .slice(0, 3);
        
        setRelatedEvents(related);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CF2D2D]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold text-[#1E2022] mb-4">Event not found</h1>
          <p className="text-[#989090] mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Link to="/events">
            <Button variant="primary">Browse All Events</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Event header with image */}
        <div 
          className="w-full h-64 md:h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${event.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <div className="max-w-7xl mx-auto">
              <Link to="/events" className="inline-flex items-center text-white hover:text-gray-200 mb-4">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Events
              </Link>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-[#CF2D2D] text-white px-3 py-1 rounded-full text-xs font-medium">
                  {event.category}
                </span>
                {event.isFeatured && (
                  <span className="bg-white text-[#1E2022] px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
            </div>
          </div>
        </div>
        
        {/* Event details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-[#1E2022] mb-4">About this Event</h2>
                  <p className="text-[#1E2022] mb-6 whitespace-pre-line">{event.description}</p>
                  
                  {event.organizer && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-[#1E2022] mb-2">Organizer</h3>
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                          {event.organizer.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <p className="text-[#1E2022] font-medium">{event.organizer.name}</p>
                          <p className="text-[#989090] text-sm">{event.organizer.email}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Related events */}
              {relatedEvents.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-[#1E2022] mb-4">Related Events</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedEvents.map(relatedEvent => (
                      <Card key={relatedEvent.id} hoverable>
                        <Link to={`/events/${relatedEvent.id}`}>
                          <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${relatedEvent.image})` }}></div>
                        </Link>
                        <CardContent>
                          <h3 className="font-semibold text-[#1E2022] mb-1 hover:text-[#CF2D2D] transition-colors">
                            <Link to={`/events/${relatedEvent.id}`}>
                              {relatedEvent.title}
                            </Link>
                          </h3>
                          <div className="flex items-center text-xs text-[#989090]">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(relatedEvent.date)}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-lg shadow overflow-hidden sticky top-24">
                <div className="p-6">
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-[#1E2022]">
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-[#989090] mt-0.5 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-[#1E2022] font-medium">Date & Time</p>
                        <p className="text-[#989090]">{formatDate(event.date)}</p>
                        <p className="text-[#989090]">{event.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-[#989090] mt-0.5 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-[#1E2022] font-medium">Location</p>
                        <p className="text-[#989090]">{event.location}</p>
                      </div>
                    </div>
                    
                    {event.attendees && (
                      <div className="flex items-start">
                        <Users className="h-5 w-5 text-[#989090] mt-0.5 flex-shrink-0" />
                        <div className="ml-3">
                          <p className="text-[#1E2022] font-medium">Attendees</p>
                          <p className="text-[#989090]">{event.attendees} people attending</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant="primary" 
                    fullWidth 
                    size="lg"
                    className="mb-3"
                  >
                    {event.price === 0 ? 'Register Now' : 'Buy Tickets'}
                  </Button>
                  
                  {!isAuthenticated && (
                    <p className="text-xs text-[#989090] text-center my-2">
                      <Link to="/login" className="text-[#CF2D2D] hover:underline">
                        Sign in
                      </Link>{' '}
                      to save this event to your profile
                    </p>
                  )}
                  
                  <div className="flex justify-between mt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 mr-2"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetailPage;