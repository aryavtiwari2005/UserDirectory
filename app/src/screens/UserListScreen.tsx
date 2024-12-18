import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, User } from '../../index';
import axios from 'axios';

type UserListScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'UserList'>;
};

const UserListScreen: React.FC<UserListScreenProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Error handling state

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const loadUsers = async (page: number) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);
      setError(null); // Reset error when starting a new request

      const response = await axios.get<User[]>(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=10`
      );

      if (page === 1) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      } else {
        setUsers((prev) => [...prev, ...response.data]);
        setFilteredUsers((prev) => [...prev, ...response.data]);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      setError('Failed to load users. Please try again later.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (key: 'name' | 'email') => {
    const sorted = [...filteredUsers].sort((a, b) =>
      a[key].localeCompare(b[key])
    );
    setFilteredUsers(sorted);
  };

  const handleEndReached = () => {
    if (!loadingMore) setPage((prev) => prev + 1);
  };

  const renderUser = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => navigation.navigate('UserDetails', { user: item })}
    >
      <Image
        source={{ uri: `https://picsum.photos/seed/${item.id}/50` }}
        style={styles.userImage}
      />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#4f6d7a" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>; // Show error message
  }

  if (filteredUsers.length === 0) {
    return <Text style={styles.noUsersText}>No users found</Text>; // No users found message
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name"
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Sort Buttons */}
      <View style={styles.sortButtons}>
        <TouchableOpacity onPress={() => handleSort('name')} style={styles.sortButton}>
          <Text style={styles.sortButtonText}>Sort by Name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSort('email')} style={styles.sortButton}>
          <Text style={styles.sortButtonText}>Sort by Email</Text>
        </TouchableOpacity>
      </View>

      {/* User List */}
      <FlatList
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#4f6d7a" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sortButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4f6d7a',
    borderRadius: 10,
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3e50',
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
    marginTop: 3,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noUsersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },
});

export default UserListScreen;
