import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Alert 
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import Header from '../components/Header';
import { Course } from '../types';

const COURSES: Course[] = ['Starters', 'Mains', 'Dessert', 'Drinks'];

export default function ManageMenuScreen({ navigation }: any) {
  const { addItem, items, removeItem, getItemsByCourse } = useMenu();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Mains');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    addItem({ 
      name: name.trim(), 
      description: description.trim(), 
      course,
      price: parseFloat(price).toFixed(2),
    });
    
    Alert.alert('Success', `${name} has been added to the menu!`, [
      { text: 'OK', onPress: () => {
        setName('');
        setDescription('');
        setPrice('');
        setCourse('Mains');
      }}
    ]);
  };

  const handleRemoveItem = (id: string, itemName: string) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove "${itemName}" from the menu?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            removeItem(id);
            Alert.alert('Success', `${itemName} has been removed from the menu`);
          }
        }
      ]
    );
  };

  const isFormValid = name.trim() && description.trim() && price.trim() && !isNaN(parseFloat(price));

  const CourseSection = ({ course }: { course: Course }) => {
    const courseItems = getItemsByCourse(course);
    
    if (courseItems.length === 0) return null;

    return (
      <View style={styles.courseSection}>
        <Text style={styles.courseTitle}>{course} ({courseItems.length})</Text>
        {courseItems.map((item) => (
          <View key={item.id} style={styles.existingItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveItem(item.id, item.name)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.mainTitle}>Manage Menu Items</Text>
        
        {/* Add New Item Section */}
        <View style={styles.addSection}>
          <Text style={styles.sectionTitle}>Add New Item</Text>
          
          <Text style={styles.label}>Dish Name *</Text>
          <TextInput 
            placeholder="Enter dish name" 
            value={name} 
            onChangeText={setName} 
            style={styles.input} 
            placeholderTextColor="#999"
          />
          
          <Text style={styles.label}>Description *</Text>
          <TextInput 
            placeholder="Enter description" 
            value={description} 
            onChangeText={setDescription} 
            style={[styles.input, styles.textArea]} 
            multiline
            numberOfLines={3}
            placeholderTextColor="#999"
          />
          
          <Text style={styles.label}>Course *</Text>
          <View style={styles.courseContainer}>
            {COURSES.map((courseOption) => (
              <TouchableOpacity
                key={courseOption}
                style={[
                  styles.courseButton,
                  course === courseOption && styles.courseButtonSelected
                ]}
                onPress={() => setCourse(courseOption)}
              >
                <Text style={[
                  styles.courseText,
                  course === courseOption && styles.courseTextSelected
                ]}>
                  {courseOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.label}>Price ($) *</Text>
          <TextInput 
            placeholder="Enter price" 
            value={price} 
            onChangeText={setPrice} 
            style={styles.input} 
            keyboardType="decimal-pad"
            placeholderTextColor="#999"
          />
          
          <TouchableOpacity 
            style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={!isFormValid}
          >
            <Text style={styles.saveButtonText}>Add to Menu</Text>
          </TouchableOpacity>
        </View>

        {/* Existing Items Section */}
        <View style={styles.existingSection}>
          <Text style={styles.sectionTitle}>Current Menu Items</Text>
          {items.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No items in menu yet. Add some above!</Text>
            </View>
          ) : (
            <>
              <CourseSection course="Starters" />
              <CourseSection course="Mains" />
              <CourseSection course="Dessert" />
              <CourseSection course="Drinks" />
            </>
          )}
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollView: { flex: 1, padding: 20 },
  
  mainTitle: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#2E8B57', 
    marginBottom: 25, 
    textAlign: 'center',
  },

  addSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },

  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#333', 
    marginBottom: 8, 
    marginTop: 16 
  },
  input: { 
    borderWidth: 2, 
    borderColor: '#E9ECEF', 
    padding: 15, 
    borderRadius: 12, 
    backgroundColor: '#F8F9FA',
    fontSize: 16,
    color: '#333',
  },
  textArea: { 
    height: 100, 
    textAlignVertical: 'top' 
  },
  courseContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  courseButton: {
    flex: 1,
    minWidth: '48%',
    padding: 15,
    margin: 4,
    borderRadius: 10,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  courseButtonSelected: {
    backgroundColor: '#2E8B57',
    borderColor: '#276749',
  },
  courseText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  courseTextSelected: {
    color: '#fff',
  },
  saveButton: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#2E8B57',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#2E8B57',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonDisabled: {
    backgroundColor: '#CCC',
    shadowColor: '#999',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  existingSection: {
    marginBottom: 20,
  },

  courseSection: {
    marginBottom: 25,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E8B57',
    marginBottom: 12,
  },
  existingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E8B57',
  },
  removeButton: {
    backgroundColor: '#DC3545',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  emptyState: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },

  backButton: {
    backgroundColor: '#6C757D',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});