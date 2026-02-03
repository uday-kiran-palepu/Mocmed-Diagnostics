// src/pages/components/SearchBar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Test {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface Props {
  onSearch: (query: string) => void;
  suggestions: Test[];
  onSuggestionClick: (test: Test) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch, suggestions, onSuggestionClick }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionSelect = (test: Test) => {
    setSearchValue('');
    setShowSuggestions(false);
    onSuggestionClick(test);
  };

  return (
    <div ref={wrapperRef} className="relative mb-6 md:mb-8">
      <div className="relative">
        <input
          type="search"
          placeholder="Search tests by name or symptoms (e.g., diabetes, thyroid, fever)"
          value={searchValue}
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
          {suggestions.map((test) => (
            <button
              key={test.id}
              onClick={() => handleSuggestionSelect(test)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-start gap-4"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{test.name}</p>
                <p className="text-sm text-gray-500 line-clamp-1">{test.description}</p>
              </div>
              <span className="text-sm font-semibold text-blue-600 whitespace-nowrap">
                ₹{test.price}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;