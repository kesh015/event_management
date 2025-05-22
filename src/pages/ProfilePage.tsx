import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Settings, LogOut } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Card, { CardContent, CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import EventList from '../components/events/EventList';
import { withAuth } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import { Event } from '../types/event';
import { fetchEvents } from '../services/api';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadUserEvents = async () => {
      try {
        const allEvents = await fetchEvents();
        
        // For demo, randomly assign some events as saved and upcoming
        // In a real app, this would come from user data
        const savedIds = ['event-1', 'event-3', 'event-5'];
        const upcomingIds = ['event-2', 'event-4', 'event-6'];
        
        setSavedEvents(allEvents.filter(event => savedIds.includes(event.id)));
        setUpcomingEvents(allEvents.filter(event => upcomingIds.includes(event.id)));
      } catch (error) {
        console.error('Error fetching user events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserEvents();
  }, []);

  if (!user) {
    return null; // Should not happen because of withAuth, but added for type safety
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-500" />
                  </div>
                  <h1 className="mt-4 text-xl font-semibold text-[#1E2022]">{user.name}</h1>
                  <p className="text-[#989090] flex items-center justify-center mt-1">
                    <Mail className="h-4 w-4 mr-1" />
                    {user.email}
                  </p>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-1">
                    <a href="#" className="flex items-center px-3 py-2 text-[#1E2022] font-medium rounded-md bg-gray-100">
                      <Calendar className="h-5 w-5 mr-3 text-[#CF2D2D]" />
                      My Events
                    </a>
                    <a href="#" className="flex items-center px-3 py-2 text-[#989090] hover:text-[#1E2022] hover:bg-gray-50 rounded-md">
                      <Settings className="h-5 w-5 mr-3" />
                      Settings
                    </a>
                    <button 
                      onClick={logout}
                      className="flex items-center px-3 py-2 text-[#989090] hover:text-[#1E2022] hover:bg-gray-50 rounded-md w-full text-left"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CF2D2D]"></div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Upcoming Events */}
                  <div>
                    <h2 className="text-2xl font-semibold text-[#1E2022] mb-6">Your Upcoming Events</h2>
                    {upcomingEvents.length > 0 ? (
                      <EventList events={upcomingEvents} />
                    ) : (
                      <Card>
                        <CardContent className="text-center py-12">
                          <Calendar className="h-12 w-12 mx-auto text-[#989090] mb-4" />
                          <h3 className="text-lg font-medium text-[#1E2022] mb-2">No upcoming events</h3>
                          <p className="text-[#989090] mb-4">You haven't registered for any events yet.</p>
                          <Button variant="primary">Browse Events</Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  
                  {/* Saved Events */}
                  <div>
                    <h2 className="text-2xl font-semibold text-[#1E2022] mb-6">Saved Events</h2>
                    {savedEvents.length > 0 ? (
                      <EventList events={savedEvents} />
                    ) : (
                      <Card>
                        <CardContent className="text-center py-12">
                          <Heart className="h-12 w-12 mx-auto text-[#989090] mb-4" />
                          <h3 className="text-lg font-medium text-[#1E2022] mb-2">No saved events</h3>
                          <p className="text-[#989090] mb-4">You haven't saved any events yet.</p>
                          <Button variant="primary">Explore Events</Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Wrap component with authentication protection
export default withAuth(ProfilePage);

// Missing import
import { Heart } from 'lucide-react';