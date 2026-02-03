// src/pages/components/CategoryFilter.tsx
import React from 'react';
import { TestTube, Grid3x3 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface Props {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<Props> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="mb-6 md:mb-8">
      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
        Browse by Category
      </h3>
      <div className="flex overflow-x-auto gap-2 md:gap-3 pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 md:px-5 md:py-3 rounded-lg border-2 transition-all duration-300 whitespace-nowrap ${
              activeCategory === category.id
                ? 'border-blue-500 bg-blue-500 text-white'
                : 'border-gray-200 bg-white text-gray-700 hover:border-blue-500 hover:bg-blue-50'
            }`}
          >
            {category.id === 'all' ? (
              <Grid3x3 size={18} />
            ) : (
              <TestTube size={18} />
            )}
            <span className="text-sm md:text-base font-medium">{category.name}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeCategory === category.id
                  ? 'bg-white bg-opacity-20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;