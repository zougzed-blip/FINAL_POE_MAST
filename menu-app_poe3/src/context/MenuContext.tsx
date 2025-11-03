import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MenuItem, Course } from '../types';

type MenuContextType = {
  items: MenuItem[];
  addItem: (item: Omit<MenuItem, 'id'>) => void;
  removeItem: (id: string) => void;
  getTotalItems: () => number;
  getItemsByCourse: (course: Course) => MenuItem[];
  getAveragePriceByCourse: (course: Course) => number;
  getAllAveragePrices: () => { course: Course; average: number; count: number }[];
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within MenuProvider');
  return context;
};

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  const addItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalItems = () => items.length;
  
  const getItemsByCourse = (course: Course) => items.filter(item => item.course === course);

  const getAveragePriceByCourse = (course: Course) => {
    const courseItems = getItemsByCourse(course);
    if (courseItems.length === 0) return 0;
    
    const total = courseItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    return total / courseItems.length;
  };

  const getAllAveragePrices = () => {
    const courses: Course[] = ['Starters', 'Mains', 'Dessert', 'Drinks'];
    return courses.map(course => ({
      course,
      average: getAveragePriceByCourse(course),
      count: getItemsByCourse(course).length,
    }));
  };

  return (
    <MenuContext.Provider value={{ 
      items, 
      addItem, 
      removeItem,
      getTotalItems, 
      getItemsByCourse,
      getAveragePriceByCourse,
      getAllAveragePrices,
    }}>
      {children}
    </MenuContext.Provider>
  );
};