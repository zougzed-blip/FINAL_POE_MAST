# FINAL_POE_MAST


## Project Overview
FINAL_POE_MAST is a comprehensive menu management application built with React Native and TypeScript. This application provides chefs with robust tools for creating and managing restaurant menus while offering guests an intuitive interface for browsing menu items.

## Features

### Chef Management Features
- **Menu Item Creation**: Add custom dishes with comprehensive details including name, description, course type, and pricing
- **Course Categorization**: Organize items into four distinct courses:
  - Starters
  - Mains 
  - Desserts
  - Drinks
- **Advanced Menu Management**:
  - Dedicated screen for adding new menu items
  - Remove functionality for existing menu items
  - Real-time tracking of total menu items
- **Price Analytics**: Automatic calculation and display of average prices per course category on the home screen

### Guest Experience Features
- **Complete Menu Browsing**: Access to all available dishes on the home screen
- **Advanced Filtering**: Filter menu items by specific course type (Starters, Mains, Desserts, or Drinks) on a dedicated filter screen

## Application Screens

### Home Screen
- Displays complete menu with all available items
- Shows average price calculations for each course category
- Provides navigation to other application features

### Add Item Screen
- Dedicated interface for creating new menu items
- Form-based input for item details (name, description, course, price)
- Course selection via dropdown/picker interface

### My Menu Screen
- Comprehensive view of all custom menu items
- Management capabilities for existing items
- Remove/delete functionality for menu items

### Filter Screen
- Guest-focused interface for course-based filtering
- Toggle filters for Starters, Mains, Desserts, and Drinks
- Dynamic display of filtered results

## Technical Specifications

### Framework & Libraries
- **Frontend Framework**: React Native
- **Programming Language**: TypeScript
- **Navigation Solution**: React Navigation
- **State Management**: React State Management with Array-based storage

### Data Architecture
```typescript
interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: 'Starters' | 'Mains' | 'Desserts' | 'Drinks';
  price: number;
}
