export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  category: string;
  image: string;
  attendees?: number;
  isFeatured: boolean;
  organizer?: {
    name: string;
    email: string;
  };
}