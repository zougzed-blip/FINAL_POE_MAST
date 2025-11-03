// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { MenuItem, useMenu } from '../context/MenuContext';

// export default function MenuCard({ name, description, price, image }: MenuItem) {
//   const { addItem } = useMenu();

//   const handlePress = () => {
//     addItem({ name, description, price, image });
//     Alert.alert('Item added', `${name} added to Menu List`);
//   };

//   return (
//     <TouchableOpacity style={styles.card} onPress={handlePress}>
//       <Image source={image} style={styles.image} />
//       <Text style={styles.name}>{name}</Text>
//       <Text style={styles.price}>${price}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     flex: 1,
//     margin: 8,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     overflow: 'hidden',
//     elevation: 3,
//   },
//   image: { width: '100%', height: 120 },
//   name: { fontSize: 16, fontWeight: '600', margin: 6 },
//   price: { fontSize: 14, fontWeight: '500', marginHorizontal: 6, marginBottom: 6, color: '#0D7466' },
// });

