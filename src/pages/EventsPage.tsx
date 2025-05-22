import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import EventList from '../components/events/EventList';
import SearchFilters, { FilterState } from '../components/events/SearchFilters';
import { Event } from '../types/event';
import { fetchEvents } from '../services/api';

const EventsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get initial filters from URL params
  const initialFilters: FilterState = {
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || 'All Categories',
    location: searchParams.get('location') || '',
    startDate: searchParams.get('startDate') || ''
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
        
        // Apply initial filters
        const filtered = applyFilters(data, initialFilters);
        setFilteredEvents(filtered);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  const applyFilters = (eventsToFilter: Event[], filters: FilterState): Event[] => {
    return eventsToFilter.filter(event => {
      // Filter by keyword (match title or description)
      if (filters.keyword && 
          !event.title.toLowerCase().includes(filters.keyword.toLowerCase()) &&
          !event.description.toLowerCase().includes(filters.keyword.toLowerCase())) {
        return false;
      }
      
      // Filter by category
      if (filters.category && 
          filters.category !== 'All Categories' && 
          event.category !== filters.category) {
        return false;
      }
      
      // Filter by location
      if (filters.location && 
          !event.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Filter by date
      if (filters.startDate && new Date(event.date) < new Date(filters.startDate)) {
        return false;
      }
      
      return true;
    });
  };

  const handleSearch = (filters: FilterState) => {
    // Update URL params
    const params: Record<string, string> = {};
    if (filters.keyword) params.keyword = filters.keyword;
    if (filters.category && filters.category !== 'All Categories') params.category = filters.category;
    if (filters.location) params.location = filters.location;
    if (filters.startDate) params.startDate = filters.startDate;
    
    setSearchParams(params);
    
    // Filter events
    const filtered = applyFilters(events, filters);
    setFilteredEvents(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-gray-50 py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1E2022] mb-2">
              Find Events
            </h1>
            <p className="text-[#989090] text-lg mb-6">
              Discover amazing events happening in your area
            </p>
            
            <SearchFilters onSearch={handleSearch} />
          </div>
        </section>
        
        {/* Events listing */}
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CF2D2D]"></div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-[#989090]">
                    {filteredEvents.length === 0
                      ? 'No events found'
                      : `Found ${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}`}
                  </p>
                </div>
                
                <EventList events={filteredEvents} />
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsPage;