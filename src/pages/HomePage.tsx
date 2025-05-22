import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import EventList from '../components/events/EventList';
import Button from '../components/common/Button';
import { Event } from '../types/event';
import { fetchEvents } from '../services/api';

const HomePage: React.FC = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const allEvents = await fetchEvents();
        setFeaturedEvents(allEvents.filter(event => event.isFeatured).slice(0, 3));
        
        // Sort upcoming events by date
        const upcoming = allEvents
          .filter(event => new Date(event.date) > new Date())
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        setUpcomingEvents(upcoming.slice(0, 6));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Discover Amazing Events Happening Around You</h1>
            <p className="text-xl mb-8">Find and attend events that match your interests and connect with like-minded people</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/events">
                <Button variant="primary" size="lg">
                  Browse Events
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 border-white">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Events */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E2022]">Featured Events</h2>
          <Link to="/events" className="text-[#CF2D2D] hover:underline font-medium">
            View all
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CF2D2D]"></div>
          </div>
        ) : (
          <EventList events={featuredEvents} />
        )}
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E2022] text-center mb-8">Browse by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Concerts', icon: '🎵' },
              { name: 'Conferences', icon: '💼' },
              { name: 'Workshops', icon: '🔧' },
              { name: 'Sports', icon: '⚽' },
              { name: 'Art & Theater', icon: '🎭' },
              { name: 'Food & Drink', icon: '🍷' },
              { name: 'Networking', icon: '🤝' },
              { name: 'Family', icon: '👪' }
            ].map(category => (
              <Link 
                key={category.name}
                to={`/events?category=${category.name}`}
                className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-[#1E2022]">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Upcoming Events */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E2022]">Upcoming Events</h2>
          <Link to="/events" className="text-[#CF2D2D] hover:underline font-medium">
            View all
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CF2D2D]"></div>
          </div>
        ) : (
          <EventList events={upcomingEvents} />
        )}
      </section>
      
      {/* CTA Section */}
      <section className="bg-[#CF2D2D] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="h-16 w-16 text-white mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to host your own event?
          </h2>
          <p className="text-white mb-8 md:text-lg max-w-2xl mx-auto">
            Share your event with thousands of people in your area and boost your attendance
          </p>
          <Link to="/signup">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#CF2D2D]"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;