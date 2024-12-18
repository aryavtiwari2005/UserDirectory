import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../index';

type UserDetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'UserDetails'>;
};

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={{ uri: `https://picsum.photos/seed/${user.id}/200` }}
        style={styles.userImage}
      />

      {/* User Details */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>
          {user.address.street}, {user.address.city}, {user.address.zipcode}
        </Text>

        <Text style={styles.label}>Company:</Text>
        <Text style={styles.value}>{user.company.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    alignItems: 'center',
    paddingVertical: 20,
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#4f6d7a',
  },
  infoContainer: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4f6d7a',
    marginBottom: 5,
    marginTop: 15,
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2d3e50',
    marginBottom: 10,
  },
});

export default UserDetailsScreen;
