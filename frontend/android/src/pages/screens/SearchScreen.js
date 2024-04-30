import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SearchScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>Search</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => {}}>
              <FontAwesome name="search" size={24} color="#888" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search WikiCulture"
            placeholderTextColor="#888"
          />
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => {}}>
              <FontAwesome name="microphone" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>History</Text>

            {/* <TouchableOpacity onPress={() => {}}>
              <FontAwesome name="ellipsis-v" size={24} color="#888" />
            </TouchableOpacity> */}
            
          </View>
        </View>

        {/* Add more sections or elements as needed */}
        
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/me.jpeg')} 
            style={styles.image}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff9e',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 86,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 17,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 28,
    marginTop: 10,
  },
  iconContainer: {
    padding: 6,
    margin: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    paddingBottom: 60,
    marginBottom: 100,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  image: {
    width: 310, 
    height: 430, 
    borderRadius: 10,
  },
});

export default SearchScreen;
