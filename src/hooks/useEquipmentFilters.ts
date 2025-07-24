import { useState, useMemo } from 'react';

export interface Equipment {
  id: string;
  title: string;
  price: number;
  priceUnit: "час" | "сутки" | "смена";
  location: string;
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
  isNew?: boolean;
  ownerName: string;
  description: string;
  imageUrl?: string;
  category: string;
}

export interface Filters {
  search: string;
  category: string;
  location: string;
  priceRange: [number, number];
  sortBy: string;
}

export const useEquipmentFilters = (equipment: Equipment[]) => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    location: '',
    priceRange: [0, 50000],
    sortBy: 'popular'
  });

  const filteredEquipment = useMemo(() => {
    let filtered = equipment.filter(item => {
      // Search filter
      if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !item.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category && item.category !== filters.category) {
        return false;
      }

      // Location filter
      if (filters.location && item.location !== filters.location) {
        return false;
      }

      // Price range filter
      if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'new':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
    }

    return filtered;
  }, [equipment, filters]);

  return {
    filters,
    setFilters,
    filteredEquipment,
    updateFilter: (key: keyof Filters, value: any) => {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };
};