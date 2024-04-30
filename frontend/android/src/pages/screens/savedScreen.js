import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements'; // Import Card and Button from react-native-elements
import { ListFilter } from 'lucide-react-native';
import { FontAwesome } from '@expo/vector-icons';

const SavedScreen = () => {
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
            <TouchableOpacity style={styles.joinbutton} onPress={() => console.log('Login button pressed')}>
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









// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
// import { ListFilter } from 'lucide-react-native';
// import { FontAwesome } from '@expo/vector-icons';

// const SavedScreen = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.head}>
//         <View style={styles.title}>
//           <Text style={styles.titleText}>Saved</Text>
//         </View>
//         <View style={styles.icons}>
//           <ListFilter color="#888" size={18} style={styles.listFilterIcon} />
//           <FontAwesome name="ellipsis-v" size={24} color="#888" style={styles.ellipsisIcon} />
//         </View>
//       </View>

//       {/* Custom Card Section */}
//       <View style={styles.cardContainer}>
//         <Image source={require('../../assets/me.jpeg')} style={styles.cardImage} />
//         <Text style={styles.cardTitle}>Card Title</Text>
//         <Text style={styles.cardDescription}>
//           This is the description of the card. Add your content here.
//         </Text>

//         {/* Button Section */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.joinButton}>
//             <Text style={styles.buttonText}>Login/join WikiCulture</Text>
//           </TouchableOpacity>
//           <Pressable style={styles.notNowButton}>
//             <Text style={styles.buttonText}>Not now</Text>
//           </Pressable>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 40,
//   },
//   head: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16, // Adjust padding as needed
//   },
//   title: {},
//   titleText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   icons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   listFilterIcon: {
//     marginRight: 26,
//   },
//   ellipsisIcon: {},
//   cardContainer: {
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     overflow: 'hidden', // Clip content to the card's rounded corners
//   },
//   cardImage: {
//     height: 200, // Adjust the height of the image as needed
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 8,
//   },
//   cardDescription: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 16,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 16,
//     marginTop: 12,
//   },
//   joinButton: {
//     flex: 1,
//     marginRight: 8,
//     paddingVertical: 12,
//     alignItems: 'center',
//     backgroundColor: '#d0cdcd6e',
//     borderRadius: 29,
//   },
//   notNowButton: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#4169E1', // Adjust the text color as needed
//   },
// });

// export default SavedScreen;
