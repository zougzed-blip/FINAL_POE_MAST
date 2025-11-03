import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity 
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import Header from '../components/Header';
import { Course } from '../types';

const COURSES: Course[] = ['Starters', 'Mains', 'Dessert', 'Drinks'];

export default function FilterMenuScreen({ navigation }: any) {
  const { items, getItemsByCourse } = useMenu();
  const [selectedCourse, setSelectedCourse] = useState<Course | 'All'>('All');

  const filteredItems = selectedCourse === 'All' 
    ? items 
    : getItemsByCourse(selectedCourse);

  const getItemCount = (course: Course | 'All') => {
    if (course === 'All') return items.length;
    return getItemsByCourse(course).length;
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.header}>
        <Text style={styles.title}>Menu Filter</Text>
        <Text style={styles.subtitle}>Browse our menu by category</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCourse === 'All' && styles.filterButtonActive
            ]}
            onPress={() => setSelectedCourse('All')}
          >
            <Text style={[
              styles.filterButtonText,
              selectedCourse === 'All' && styles.filterButtonTextActive
            ]}>
              All ({getItemCount('All')})
            </Text>
          </TouchableOpacity>

          {COURSES.map((course) => (
            <TouchableOpacity
              key={course}
              style={[
                styles.filterButton,
                selectedCourse === course && styles.filterButtonActive
              ]}
              onPress={() => setSelectedCourse(course)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedCourse === course && styles.filterButtonTextActive
              ]}>
                {course} ({getItemCount(course)})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No items found</Text>
            <Text style={styles.emptyText}>
              {selectedCourse === 'All' 
                ? 'No items have been added to the menu yet.' 
                : `No items in ${selectedCourse} category.`}
            </Text>
          </View>
        ) : (
          <View style={styles.itemsContainer}>
            <Text style={styles.resultCount}>
              Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </Text>
            
            {filteredItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => navigation.navigate('ItemDetails', { item })}
              >
                <View style={styles.itemHeader}>
                  <View style={styles.courseBadge}>
                    <Text style={styles.courseBadgeText}>{item.course}</Text>
                  </View>
                </View>
                
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                
                <View style={styles.itemFooter}>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                  <Text style={styles.viewDetailsText}>View Details →</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2E8B57',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  filterScroll: {
    paddingHorizontal: 15,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  filterButtonActive: {
    backgroundColor: '#2E8B57',
    borderColor: '#2E8B57',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  scrollView: { 
    flex: 1 
  },
  itemsContainer: {
    padding: 20,
  },
  resultCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    marginBottom: 10,
  },
  courseBadge: {
    backgroundColor: '#2E8B57',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  courseBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F8F9FA',
  },
  itemPrice: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E8B57',
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#2E8B57',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#666',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: '#6C757D',
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});