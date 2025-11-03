import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image 
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import Header from '../components/Header';
import { Course } from '../types';

export default function HomeScreen({ navigation }: any) {
  const { items, getTotalItems, getAllAveragePrices } = useMenu();

  const averagePrices = getAllAveragePrices();

  const CourseAverageCard = ({ course, average, count }: { course: Course; average: number; count: number }) => (
    <View style={styles.averageCard}>
      <Text style={styles.averageCourse}>{course}</Text>
      <Text style={styles.averagePrice}>
        {count > 0 ? `$${average.toFixed(2)}` : 'N/A'}
      </Text>
      <Text style={styles.averageLabel}>Average Price</Text>
      <Text style={styles.averageCount}>{count} items</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.heroSection}>
        <Image 
          source={require('../assets/images/chef.webp')}
          style={styles.chefImage}
        />
        <View style={styles.heroText}>
          <Text style={styles.welcomeTitle}>Welcome, Chef! 👨‍🍳</Text>
          <Text style={styles.subtitle}>
            Manage your complete restaurant menu
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{getTotalItems()}</Text>
          <Text style={styles.statLabel}>Total Items</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Average Prices by Course</Text>
        <View style={styles.averagesContainer}>
          {averagePrices.map((item) => (
            <CourseAverageCard
              key={item.course}
              course={item.course}
              average={item.average}
              count={item.count}
            />
          ))}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('ManageMenu')}
          >
            <Text style={styles.actionButtonText}>📝 Manage Menu Items</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => navigation.navigate('MenuList')}
          >
            <Text style={styles.actionButtonText}>📋 View Full Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.tertiaryButton]}
            onPress={() => navigation.navigate('FilterMenu')}
          >
            <Text style={styles.actionButtonText}>🔍 Filter Menu (Guest View)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  chefImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#2E8B57',
  },
  heroText: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E8B57',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2E8B57',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  scrollView: { flex: 1, padding: 20 },
  
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },

  averagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  averageCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  averageCourse: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E8B57',
    marginBottom: 10,
  },
  averagePrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  averageLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  averageCount: {
    fontSize: 11,
    color: '#999',
  },

  actionsContainer: {
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#2E8B57',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#2E8B57',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: '#6C757D',
    shadowColor: '#6C757D',
  },
  tertiaryButton: {
    backgroundColor: '#FF7F3F',
    shadowColor: '#FF7F3F',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});