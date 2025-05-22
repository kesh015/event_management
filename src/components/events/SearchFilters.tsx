import React, { useState } from 'react';
import { Search, Calendar, MapPin, X } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

interface SearchFiltersProps {
  onSearch: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  keyword: string;
  category: string;
  location: string;
  startDate: string;
}

const categories = [
  'All Categories',
  'Concerts',
  'Conferences',
  'Workshops',
  'Sports',
  'Art & Theater',
  'Food & Drink',
  'Networking'
];

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch, className = '' }) => {
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    category: 'All Categories',
    location: '',
    startDate: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const clearFilters = () => {
    setFilters({
      keyword: '',
      category: 'All Categories',
      location: '',
      startDate: ''
    });
    onSearch({
      keyword: '',
      category: 'All Categories',
      location: '',
      startDate: ''
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow p-4 sm:p-6 ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input 
            placeholder="Search for events"
            name="keyword"
            value={filters.keyword}
            onChange={handleInputChange}
            fullWidth
            icon={<Search className="h-5 w-5 text-[#989090]" />}
          />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <button 
            type="button"
            className="text-sm text-[#989090] hover:text-[#CF2D2D] flex items-center"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide filters' : 'More filters'}
          </button>
          
          {(filters.category !== 'All Categories' || filters.location || filters.startDate) && (
            <button 
              type="button"
              className="text-sm text-[#989090] hover:text-[#CF2D2D] flex items-center"
              onClick={clearFilters}
            >
              <X className="h-4 w-4 mr-1" /> Clear filters
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="space-y-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-[#1E2022] mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#B0BABF] py-2 pl-3 pr-10 text-[#1E2022] focus:border-[#CF2D2D] focus:outline-none focus:ring-[#CF2D2D] text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <Input
                  label="Location"
                  placeholder="Any location"
                  name="location"
                  value={filters.location}
                  onChange={handleInputChange}
                  icon={<MapPin className="h-5 w-5 text-[#989090]" />}
                />
              </div>
              
              <div>
                <Input
                  label="Date"
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleInputChange}
                  icon={<Calendar className="h-5 w-5 text-[#989090]" />}
                />
              </div>
            </div>
          </div>
        )}
        
        <Button 
          type="submit"
          variant="primary"
          fullWidth
        >
          Search Events
        </Button>
      </form>
    </div>
  );
};

export default SearchFilters;