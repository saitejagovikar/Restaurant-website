import React, { useState, useRef, useEffect } from 'react';

export interface Filters {
  cuisine: string;
  isVeg: boolean;
  hasOutdoorSeating?: boolean;
}

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
  onSortChange: (sortBy: string) => void;
  onVegToggle: (isVeg: boolean) => void;
  sortBy?: string;
  viewMode: 'DELIVERY' | 'DINE_IN';
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  onSortChange,
  onVegToggle,
  sortBy = '',
  className = '',
  viewMode
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (filterType: keyof Filters, value: any) => {
    onFilterChange({ ...filters, [filterType]: value });
  };

  // Clear cuisine filter when switching to Dine-In mode
  useEffect(() => {
    if (viewMode === 'DINE_IN' && filters.cuisine) {
      handleChange('cuisine', '');
    }
  }, [viewMode]);

  const hasActiveFilters =
    (viewMode === 'DELIVERY' && (filters.cuisine !== '' || filters.isVeg)) ||
    (viewMode === 'DINE_IN' && (filters.hasOutdoorSeating || filters.isVeg));

  // FIXED: Removed "+" from options, we will add it only in UI
  const cuisineOptions = ['Italian', 'Chinese', 'Japanese', 'Indian', 'Mexican', 'American', 'Thai'];



  const sortOptions = [
    { value: 'rating-desc', label: 'Rating: High to Low' },
    { value: 'price-asc', label: 'Cost: Low to High' },
    { value: 'price-desc', label: 'Cost: High to Low' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSelectedSortLabel = () => {
    const selected = sortOptions.find(opt => opt.value === sortBy);
    return selected ? selected.label : 'Sort By';
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-100 ${className}`}>
      <div className="px-4 py-3 flex flex-wrap items-center gap-3">

        {/* Veg Toggle Switch (Delivery Only) */}
        {viewMode === 'DELIVERY' && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Veg Only</span>
            <button
              onClick={() => onVegToggle(!filters.isVeg)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${filters.isVeg ? 'bg-green-500' : 'bg-gray-300'
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${filters.isVeg ? 'translate-x-6' : 'translate-x-1'
                  }`}
              />
            </button>
          </div>
        )}

        {/* Outdoor Seating Toggle (Dine-In Only) */}
        {viewMode === 'DINE_IN' && (
          <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
            <span className="text-sm text-gray-700">Outdoor Seating</span>
            <button
              onClick={() => handleChange('hasOutdoorSeating', !filters.hasOutdoorSeating)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${filters.hasOutdoorSeating ? 'bg-blue-500' : 'bg-gray-300'
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${filters.hasOutdoorSeating ? 'translate-x-6' : 'translate-x-1'
                  }`}
              />
            </button>
          </div>
        )}

        {/* Cuisine Filter (Delivery Only) */}
        {viewMode === 'DELIVERY' && (
          <div className="relative">
            <select
              value={filters.cuisine}
              onChange={(e) => handleChange('cuisine', e.target.value)}
              className="text-sm text-gray-700 px-3 py-1.5 border border-gray-200 rounded-md focus:ring-primary-500 cursor-pointer"
            >
              <option value="">All Cuisines</option>
              {cuisineOptions.map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
          </div>
        )}

        {/* Sort Dropdown with Radio Buttons */}
        <div className="relative" ref={sortDropdownRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="text-sm text-gray-700 px-3 py-1.5 border border-gray-200 rounded-md focus:ring-primary-500 cursor-pointer bg-white hover:bg-gray-50 flex items-center gap-2"
          >
            {getSelectedSortLabel()}
            <svg className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isSortOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[200px]">
              <div className="py-2 px-3 space-y-2">
                {sortOptions.map(option => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 py-1 px-2 rounded">
                    <input
                      type="radio"
                      name="sort"
                      checked={sortBy === option.value}
                      onChange={() => {
                        onSortChange(option.value);
                        setIsSortOpen(false);
                      }}
                      className="w-5 h-5 text-red-500 border-gray-300 focus:ring-red-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5 hover:bg-gray-50 rounded-md"
            title="Clear all filters"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

      </div>
    </div>
  );
};

export default FilterBar;
