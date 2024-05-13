import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements'; // Import Card and Button from react-native-elements
import { ListFilter } from 'lucide-react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EditScreen = () => {
  const navigation = useNavigation();
  
  const handleItemClick = () => {
    // Navigate to the details screen or perform other actions
    // Replace 'Details' with the actual screen name you want to navigate to
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Edits</Text>
        </View>
        {/* <View style={styles.icons}>
          <ListFilter color="black" size={20} style={styles.listFilterIcon} />
          <FontAwesome name="ellipsis-v" size={24} color="black" style={styles.ellipsisIcon} />
        </View> */}
      </View>

      {/* Card Section */}
      <Card containerStyle={styles.cardContainer}>
        <Card.Image source={require('../../assets/me.jpeg')} style={styles.cardImage} />
        <Text style={styles.cardTitle}>Did you know that everyone can edit WikiCulture?</Text>
        <Text style={styles.cardDescription}>
          Suggested edits is a new way to edit WikiCulture on Andorid. It helps you make vital contributions to WikiCulture. Our goal is to make editing easier and ore accessibile for everyone! Login or join WikiCulture
          to get started.
        </Text>

        {/* Button Section */}
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.joinbutton} onPress={handleItemClick}>
              <Text style={styles.jbuttonText}>Login/join WikiCulture</Text>
            </TouchableOpacity>

            {/* onPress={() => console.log('Login button pressed')}  */}
            {/* <TouchableOpacity style={styles.notbutton} onPress={() => console.log('Not now button pressed')}>
              <Text style={styles.nbuttonText}>Not now</Text>
            </TouchableOpacity> */}
          </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 75,
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
    // marginLeft: 32,
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

export default EditScreen;

