import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements'; // Import Card and Button from react-native-elements
import { ListFilter } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const SavedScreen = () => {
  const navigation = useNavigation();
  
  const handleLogin = () => {  
    // Example navigation to another screen after successful login
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Saved</Text>
        </View>
        <View style={styles.icons}>
          <ListFilter color="black" size={20} style={styles.listFilterIcon} />
          <FontAwesome name="ellipsis-v" size={24} color="black" style={styles.ellipsisIcon} />
        </View>
      </View>

      {/* Card Section */}
      <Card containerStyle={styles.cardContainer}>
        <Card.Image source={require('../../assets/me.jpeg')} style={styles.cardImage} />
        <Text style={styles.cardTitle}>Sync reading lists</Text>
        <Text style={styles.cardDescription}>
          Reading lists can now be synced across devices. Log in to your WikiCulture account and allow your lists to be saved.
        </Text>

        {/* Button Section */}
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.joinbutton} onPress={handleLogin}>
              <Text style={styles.jbuttonText}>Login/join WikiCulture</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.notbutton} onPress={() => console.log('Not now button pressed')}>
              <Text style={styles.nbuttonText}>Not now</Text>
            </TouchableOpacity>
          </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45,
    // backgroundColor: '#fdfcfcdb',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listFilterIcon: {
    marginRight: 29,
  },
  cardContainer: {
    backgroundColor: '#eaebebeb',
    borderRadius: 10,
    shadowColor: '#919191cf',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    height: 200,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 20,
  },

  joinbutton: {
    backgroundColor: '#e7e4e487',
    paddingHorizontal: 21,
    padding: 5,
    borderRadius: 50,
    paddingVertical: 9,
  },
  notbutton: {
    // paddingHorizontal: 19,
    padding: 5,
    borderRadius: 50,
    marginLeft: 32,
  },

  jbuttonText: {
    marginLeft: -8,
    color: '#4169E1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nbuttonText: {
    marginLeft: -19,
    marginTop: 5,
    color: '#787878',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SavedScreen;

