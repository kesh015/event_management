import { Event } from '../types/event';

// Mock data for events
const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Tech Conference 2025',
    description: 'Join us for the biggest tech conference of the year. Network with industry leaders, attend workshops, and learn about the latest technology trends.\n\nThis three-day event features keynote speeches, hands-on workshops, networking opportunities, and much more.',
    date: '2025-06-15',
    time: '09:00 AM - 06:00 PM',
    location: 'San Francisco Convention Center',
    price: 299,
    category: 'Conferences',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1600',
    attendees: 1200,
    isFeatured: true,
    organizer: {
      name: 'TechEvents Inc.',
      email: 'info@techevents.com'
    }
  },
  {
    id: 'event-2',
    title: 'Summer Music Festival',
    description: 'Experience the ultimate summer festival with performances from top artists across multiple genres. Food, drinks, and unforgettable memories await!',
    date: '2025-07-20',
    time: '12:00 PM - 11:00 PM',
    location: 'Golden Gate Park, San Francisco',
    price: 89.99,
    category: 'Concerts',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600',
    attendees: 5000,
    isFeatured: true
  },
  {
    id: 'event-3',
    title: 'UX/UI Design Workshop',
    description: 'Learn practical UX/UI design skills in this intensive workshop. Perfect for beginners and intermediate designers looking to level up their skills.',
    date: '2025-05-18',
    time: '10:00 AM - 04:00 PM',
    location: 'Design Hub, 123 Creative St',
    price: 149,
    category: 'Workshops',
    image: 'https://images.pexels.com/photos/7256897/pexels-photo-7256897.jpeg?auto=compress&cs=tinysrgb&w=1600',
    attendees: 30,
    isFeatured: false,
    organizer: {
      name: 'Design Academy',
      email: 'workshops@designacademy.com'
    }
  },
  {
    id: 'event-4',
    title: 'Startup Networking Mixer',
    description: 'Connect with founders, investors, and talent at our monthly startup mixer. Build valuable relationships in a relaxed environment.',
    date: '2025-04-25',
    time: '06:30 PM - 09:30 PM',
    location: 'Startup Hub, 456 Innovation Ave',
    price: 0,
    category: 'Networking',
    image: 'https://images.pexels.com/photos/7642001/pexels-photo-7642001.jpeg?auto=compress&cs=tinysrgb&w=1600',
    attendees: 75,
    isFeatured: false
  },
  {
    id: 'event-5',
    title: 'Marathon for Charity',
    description: 'Run for a cause! Join our annual charity marathon and help raise funds for local community projects. All fitness levels welcome.',
    date: '2025-09-10',
    time: '07:00 AM - 12:00 PM',
    location: 'City Park',
    price: 25,
    category: 'Sports',
    image: 'https://images.pexels.com/photos/2774589/pexels-photo-2774589.jpeg?auto=compress&cs=tinysrgb&w=1600',
    attendees: 500,
    isFeatured: true
  },
  {
    id: 'event-6',
    title: 'Wine Tasting Experience',
    description: 'Sample premium wines from local vineyards paired with gourmet appetizers. A sophisticated evening for wine enthusiasts.',
    date: '2025-05-30',
    time: '07:00 PM - 10:00 PM',
    location: 'Vineyard Estates, Napa Valley',
    price: 75,
    category: 'Food & Drink',
    image: 'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1600',
    attendees: 50,
    isFeatured: false
  },
  {
    id: 'event-7',
    title: 'Art Exhibition Opening',
    description: 'Be among the first to see this groundbreaking exhibition featuring works from emerging artists. Includes a meet-and-greet with the artists.',
    date: '2025-06-05',
    time: '06:00 PM - 09:00 PM',
    location: 'Modern Art Gallery, Downtown',
    price: 15,
    category: 'Art & Theater',
    image: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1600',
    attendees: 120,
    isFeatured: false
  },
  {
    id: 'event-8',
    title: 'Family Fun Day',
    description: 'A day packed with activities for the whole family including games, rides, food, and entertainment. Create lasting memories together!',
    date: '2025-07-04',
    time: '10:00 AM - 06:00 PM',
    location: 'Community Park',
    price: 0,
    category: 'Family',
    image: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1600',
    attendees: 300,
    isFeatured: true
  },
  {
    id: 'event-9',
    title: 'JavaScript Developer Conference',
    description: 'Stay on top of the latest JavaScript frameworks and tools. Two days of technical talks, code workshops, and networking.',
    date: '2025-08-15',
    time: '09:00 AM - 05:00 PM',
    location: 'Tech Campus, Building 4',
    price: 199,
    category: 'Conferences',
    image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1600',
    attendees: 400,
    isFeatured: false,
    organizer: {
      name: 'JS Community',
      email: 'conference@jscommunity.org'
    }
  }
];

// Simulate API fetch delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all events
export const fetchEvents = async (): Promise<Event[]> => {
  await delay(800); // Simulate network request
  return [...mockEvents];
};

// Fetch a single event by ID
export const fetchEventById = async (id: string): Promise<Event> => {
  await delay(600); // Simulate network request
  const event = mockEvents.find(event => event.id === id);
  
  if (!event) {
    throw new Error('Event not found');
  }
  
  return { ...event };
};