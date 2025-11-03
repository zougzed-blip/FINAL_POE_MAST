export type Course = 'Starters' | 'Mains' | 'Dessert' | 'Drinks';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: string;
};