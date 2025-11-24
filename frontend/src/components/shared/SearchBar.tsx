import React, { useState, useEffect, useCallback } from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  value?: string;
  onChange?: (query: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  placeholder?: string;
  className?: string;
  searchButton?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Search restaurants...',
  className = '',
  searchButton = false
}) => {
  const [localQuery, setLocalQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Use controlled input if value prop is provided
  const query = onChange ? value : localQuery;
  const setQuery = onChange ? onChange : setLocalQuery;

  // Debounce search with 300ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const hasValue = query.length > 0;

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          className={className || `block w-full pl-12 pr-10 py-3 bg-white border border-gray-300 rounded-full leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button
            type="button"
            className={`absolute inset-y-0 ${searchButton ? 'right-28' : 'right-0'} pr-4 flex items-center`}
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg
              className="h-5 w-5 text-gray-400 hover:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        {/* Search indicator animation - only show if no search button */}
        {query && query !== debouncedQuery && onSearch && !searchButton && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-12 pointer-events-none">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        )}

        {searchButton && (
          <button
            type="submit"
            className="absolute right-2 top-1.5 bottom-1.5 bg-[#ff6b35] text-white px-6 rounded-full font-medium hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-sm"
          >
            Search
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
