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

export default function AddItemScreen({ navigation }: any) {
  const { addItem } = useMenu();
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

  const isFormValid = name.trim() && description.trim() && price.trim() && !isNaN(parseFloat(price));

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add New Menu Item</Text>
        
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
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={!isFormValid}
          >
            <Text style={styles.saveButtonText}>Add to Menu</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.viewMenuButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.viewMenuButtonText}>View Menu</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollView: { flex: 1, padding: 20 },
  title: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#2E8B57', 
    marginBottom: 30, 
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
    backgroundColor: '#fff',
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
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  saveButton: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#2E8B57',
    alignItems: 'center',
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
  viewMenuButton: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#6C757D',
    alignItems: 'center',
    marginTop: 10,
  },
  viewMenuButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});