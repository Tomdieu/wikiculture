import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons or any other icon library
import moment from 'moment'; // Import moment library for date formatting
import { Share2, Activity, Dot } from 'lucide-react-native';


const Explore = () => {
  const navigation = useNavigation();

  // const handleItemClick = () => {
  //   navigation.navigate('Details');
  // };

  const handleItemClick = (name, description, title) => {
    navigation.navigate('Details', { name, description, title });
  };

  const handleEllipsisIconPress = () => {

  };

  const todayDate = moment().format('MMMM D, YYYY'); // Format today's date

  const yesterdayDate = moment().subtract(1, 'days').format('MMMM D, YYYY'); // Yesterday's date

  const twodaysagoDate = moment().subtract(2, 'days').format('MMMM D, YYYY'); // Yesterday's date

  const threedaysagoDate = moment().subtract(3, 'days').format('MMMM D, YYYY'); // Yesterday's date

  const renderVerticalElements = () => {
    const elements = [];

    // Data for 5 items with different names, descriptions, and views
    const data = [
      { id: 1, name: 'John Doe', description: 'Description for John Doe', views: 100 },
      { id: 2, name: 'Jane Smith', description: 'Description for Jane Smith', views: 150 },
      { id: 3, name: 'Bob Johnson', description: 'Description for Bob Johnson', views: 200 },
      { id: 4, name: 'Alice Brown', description: 'Description for Alice Brown', views: 120 },
      { id: 5, name: 'Eve Wilson', description: 'Description for Eve Wilson', views: 180 },
    ];

    data.forEach(item => {
      // Dynamically generate a unique slanted line style for each element
      const slantedLineStyle = {
        ...styles.slantedLine,
        transform: [{ rotate: `${item.id % 2 === 0 ? '45deg' : '-45deg'}` }],
      };

      elements.push(
        <View key={item.id} style={styles.verticalElement}>
          <View style={styles.verticalElementTextContainer}>
            <Text style={styles.verticalElementName}>{item.name}</Text>
            <Activity color="#057a65de" size={18} style={styles.slantedLine} />
            {/* <View style={slantedLineStyle} /> */}
            <Text style={styles.verticalElementDescription}>{item.description}</Text>
            <View style={styles.verticalElementViewsContainer}>
              <Text style={styles.viewsText}>{item.views}k</Text>
            </View>
          </View>
          <Image source={require('../../assets/me.jpeg')} style={styles.verticalElementImage} />
        </View>
      );

      // Add a thin gray line between elements, except for the last one
      if (item.id < 5) {
        elements.push(<View key={`line_${item.id}`} style={styles.separatorLine} />);
      }
    });

    return elements;
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.headcontainer}>
      <Text style={styles.boldh1}>W</Text>
      <Text style={styles.boldh2}>ikiCultur</Text>
      <Text style={styles.boldl1}>E</Text>
    </View>
      {/* <Text style={{ fontSize: 30,...styles.title }}>Inter Black</Text> */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome name="search" size={24} color="#888" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search WikiCulture"
            placeholderTextColor="#888"
          // Add onChangeText and onSubmitEditing as needed for search functionality
          />
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome name="microphone" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeaderTitle}>{todayDate}</Text>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Content</Text>
            <TouchableOpacity onPress={handleEllipsisIconPress}>
              <FontAwesome name="ellipsis-v" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemClick('Item Name 2', 'Description for Item 2', 'Item Title 2')}>
          <Image source={require('../../assets/me.jpeg')} style={styles.itemImage} />
          <Text style={styles.itemName}>Item Name 2</Text>
          <Text style={styles.itemDescription}>Description for Item 2</Text>
          <Text style={styles.itemTitle}>Item Title 2</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.moreto}>Today on WikiCulture <FontAwesome name="arrow-right" size={18} color="#4169E1" /> </Text>
        </TouchableOpacity>

        <View style={styles.sectionContainer}>
          {/* <Text style={styles.sectionHeaderTitle}>{todayDate}</Text> */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top read</Text>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome name="ellipsis-v" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.sectionContainer, styles.topReadSection]}>
          <View style={styles.topReadContainer}>{renderVerticalElements()}</View>
        </View>

        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.moretop}>More top read <FontAwesome name="arrow-right" size={18} color="#4169E1" /> </Text>
        </TouchableOpacity>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Picture of the day</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => { }}>
                {/* <FontAwesome name="time" size={24} color="#888" /> */}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }}>
                <FontAwesome name="ellipsis-v" size={24} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.pictureCon} onPress={() => handleItemClick('Item Name 3', 'Description for Item 3', 'Item Title 3')}>
          <Image source={require('../../assets/me.jpeg')} style={styles.itemImage} />
          <Text style={styles.picDescription}>
            Description for Item 3 Description for Item 3 Description for Item 3 Description for Item 3
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => console.log('Download button pressed')}>
              <FontAwesome name="download" size={24} color="#4169E1" />
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => console.log('Share button pressed')}>
              <Share2 color="#4169E1" size={18} />
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>


        <View style={styles.daysectionContainer}>
          {/* <Text style={styles.sectionHeaderTitle}>{todayDate}</Text> */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>On this day</Text>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome name="ellipsis-v" size={24} color="#888" />
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ borderLeftWidth: 1, borderLeftColor: "#ccc", marginBottom: 25, position: "relative", minHeight: 100, marginLeft: 9 }}>
          <Dot color={"#3a3ae9"} size={64} style={{ position: "absolute", top: -44, left: -32, marginBottom: 100, zIndex: 30 }} />
          <View style={{ paddingHorizontal: 17 }}>
            <Text style={{ color: "#3a3ae9", fontSize: 20, fontWeight: "bold",marginTop:-27 }}>1969</Text>
            <Text style={{fontWeight:"bold",fontSize:18}}>26 years old</Text> 
            <Text>Lorem ipsum</Text>

            <TouchableOpacity
              style={{ borderRadius: 10, backgroundColor: "#fff", shadowColor: "#000", ...styles.pictureCon }}
              onPress={() => handleItemClick('Drudge Report', 'Lorem ipsum dolore Loreme ipsum dolore')}>
              <Image source={require('../../assets/me.jpeg')} style={{ width: "100%", height: 200 }} />
              <View style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "#fff" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>Drudge Report</Text>
                <Text style={{ fontWeight: "400", fontSize: 14 }}>Lorem ipsum dolore Loreme ipsum dolore</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeaderTitle}>{yesterdayDate}</Text>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Content</Text>
            <TouchableOpacity onPress={handleEllipsisIconPress}>
              <FontAwesome name="ellipsis-v" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.itemContainer} onPress={handleItemClick}>
          <Image source={require('../../assets/me.jpeg')} style={styles.itemImage} />
          <Text style={styles.itemName}>Item Name 2</Text>
          <Text style={styles.itemDescription}>Description for Item 2</Text>
          <Text style={styles.itemTitle}>Item Title 2</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.moreto}>Today on WikiCulture <FontAwesome name="arrow-right" size={18} color="#4169E1" /> </Text>
        </TouchableOpacity>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top read</Text>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome name="ellipsis-v" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.sectionContainer, styles.topReadSection]}>
          <View style={styles.topReadContainer}>{renderVerticalElements()}</View>
        </View>

        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.moretop}>More top read <FontAwesome name="arrow-right" size={18} color="#4169E1" /> </Text>
        </TouchableOpacity>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Picture of the day</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => { }}>
                {/* <FontAwesome name="time" size={24} color="#888" /> */}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }}>
                <FontAwesome name="ellipsis-v" size={24} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <TouchableOpacity style={styles.pictureCon} onPress={() => { }}>
          <Image source={require('../../assets/me.jpeg')} style={styles.itemImage} />
          <Text style={styles.picDescription}>
            Description for Item 2 Description for Item 2 Description for Item 2 Description for Item 2
          </Text>
          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.button} onPress={() => console.log('Download button pressed')}>
              <FontAwesome name="download" size={24} color="#4169E1" />
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={() => console.log('Share button pressed')}>
              <Share2 color="#4169E1" size={18} />
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.daysectionContainer}>
          {/* <Text style={styles.sectionHeaderTitle}>{todayDate}</Text> */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>On this day</Text>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome name="ellipsis-v" size={24} color="#888" />
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ borderLeftWidth: 1, borderLeftColor: "#ccc", marginBottom: 25, position: "relative", minHeight: 100, marginLeft: 9 }}>
          <Dot color={"#3a3ae9"} size={64} style={{ position: "absolute", top: -44, left: -32, marginBottom: 100, zIndex: 30 }} />
          <View style={{ paddingHorizontal: 17 }}>
            <Text style={{ color: "#3a3ae9", fontSize: 20, fontWeight: "bold",marginTop:-27 }}>1969</Text>
            <Text style={{fontWeight:"bold",fontSize:18}}>26 years old</Text>
            <Text>Lorem ipsum</Text>
            <TouchableOpacity style={{borderRadius:10,backgroundColor:"#fff",shadowColor:"#000",...styles.pictureCon}}>
              {/* image */}
              <Image  source={require('../../assets/me.jpeg')} style={{width:"100%",height:200}}/>
              <View style={{paddingHorizontal:10,paddingVertical:5,backgroundColor:"#fff"}}>
                <Text style={{fontWeight:"bold",fontSize:16}}>Drudge Report</Text>
                <Text style={{fontWeight:"400",fontSize:14}}>Lorem ipsum dolore Loreme ipsum dolore</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeaderTitle}>{twodaysagoDate}</Text>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Content</Text>
            <TouchableOpacity onPress={handleEllipsisIconPress}>
              <FontAwesome name="ellipsis-v" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.itemContainer} onPress={handleItemClick}>
          <Image source={require('../../assets/me.jpeg')} style={styles.itemImage} />
          <Text style={styles.itemName}>Item Name 2</Text>
          <Text style={styles.itemDescription}>Description for Item 2</Text>
          <Text style={styles.itemTitle}>Item Title 2</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.moreto}>Today on WikiCulture <FontAwesome name="arrow-right" size={18} color="#4169E1" /> </Text>
        </TouchableOpacity>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top read</Text>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome name="ellipsis-v" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.sectionContainer, styles.topReadSection]}>
          <View style={styles.topReadContainer}>{renderVerticalElements()}</View>
        </View>

        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.moretop}>More top read <FontAwesome name="arrow-right" size={18} color="#4169E1" /> </Text>
        </TouchableOpacity>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Picture of the day</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => { }}>
                {/* <FontAwesome name="time" size={24} color="#888" /> */}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }}>
                <FontAwesome name="ellipsis-v" size={24} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <TouchableOpacity style={styles.pictureCon} onPress={() => { }}>
          <Image source={require('../../assets/me.jpeg')} style={styles.itemImage} />
          <Text style={styles.picDescription}>
            Description for Item 2 Description for Item 2 Description for Item 2 Description for Item 2
          </Text>
          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.button} onPress={() => console.log('Download button pressed')}>
              <FontAwesome name="download" size={24} color="#4169E1" />
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={() => console.log('Share button pressed')}>
              <Share2 color="#4169E1" size={18} />
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.daysectionContainer}>
          {/* <Text style={styles.sectionHeaderTitle}>{todayDate}</Text> */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>On this day</Text>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome name="ellipsis-v" size={24} color="#888" />
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ borderLeftWidth: 1, borderLeftColor: "#ccc", marginBottom: 25, position: "relative", minHeight: 100, marginLeft: 9 }}>
          <Dot color={"#3a3ae9"} size={64} style={{ position: "absolute", top: -44, left: -32, marginBottom: 100, zIndex: 30 }} />
          <View style={{ paddingHorizontal: 17 }}>
            <Text style={{ color: "#3a3ae9", fontSize: 20, fontWeight: "bold",marginTop:-27 }}>1969</Text>
            <Text style={{fontWeight:"bold",fontSize:18}}>26 years old</Text>
            <Text>Lorem ipsum</Text>
            <TouchableOpacity style={{borderRadius:10,backgroundColor:"#fff",shadowColor:"#000",...styles.pictureCon}}>
              {/* image */}
              <Image  source={require('../../assets/me.jpeg')} style={{width:"100%",height:200}}/>
              <View style={{paddingHorizontal:10,paddingVertical:5,backgroundColor:"#fff"}}>
                <Text style={{fontWeight:"bold",fontSize:16}}>Drudge Report</Text>
                <Text style={{fontWeight:"400",fontSize:14}}>Lorem ipsum dolore Loreme ipsum dolore</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeaderTitle}>{threedaysagoDate}</Text>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Content</Text>
            <TouchableOpacity onPress={handleEllipsisIconPress}>
              <FontAwesome name="ellipsis-v" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.itemContainer} onPress={handleItemClick}>
          <Image source={require('../../assets/me.jpeg')} style={styles.itemImage} />
          <Text style={styles.itemName}>Item Name 2</Text>
          <Text style={styles.itemDescription}>Description for Item 2</Text>
          <Text style={styles.itemTitle}>Item Title 2</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.moreto}>Today on WikiCulture <FontAwesome name="arrow-right" size={18} color="#4169E1" /> </Text>
        </TouchableOpacity>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top read</Text>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome name="ellipsis-v" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.sectionContainer, styles.topReadSection]}>
          <View style={styles.topReadContainer}>{renderVerticalElements()}</View>
        </View>

        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.moretop}>More top read <FontAwesome name="arrow-right" size={18} color="#4169E1" /> </Text>
        </TouchableOpacity>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Picture of the day</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => { }}>
                {/* <FontAwesome name="time" size={24} color="#888" /> */}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }}>
                <FontAwesome name="ellipsis-v" size={24} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <TouchableOpacity style={styles.pictureCon} onPress={() => { }}>
          <Image source={require('../../assets/me.jpeg')} style={styles.itemImage} />
          <Text style={styles.picDescription}>
            Description for Item 2 Description for Item 2 Description for Item 2 Description for Item 2
          </Text>
          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.button} onPress={() => console.log('Download button pressed')}>
              <FontAwesome name="download" size={24} color="#4169E1" />
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={() => console.log('Share button pressed')}>
              <Share2 color="#4169E1" size={18} />
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.daysectionContainer}>
          {/* <Text style={styles.sectionHeaderTitle}>{todayDate}</Text> */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>On this day</Text>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome name="ellipsis-v" size={24} color="#888" />
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ borderLeftWidth: 1, borderLeftColor: "#ccc", marginBottom: 25, position: "relative", minHeight: 100, marginLeft: 9 }}>
          <Dot color={"#3a3ae9"} size={64} style={{ position: "absolute", top: -44, left: -32, marginBottom: 100, zIndex: 30 }} />
          <View style={{ paddingHorizontal: 17 }}>
            <Text style={{ color: "#3a3ae9", fontSize: 20, fontWeight: "bold",marginTop:-27 }}>1969</Text>
            <Text style={{fontWeight:"bold",fontSize:18}}>26 years old</Text>
            <Text>Lorem ipsum</Text>
            <TouchableOpacity style={{borderRadius:10,backgroundColor:"#fff",shadowColor:"#000",...styles.pictureCon}}>
              {/* image */}
              <Image  source={require('../../assets/me.jpeg')} style={{width:"100%",height:200}}/>
              <View style={{paddingHorizontal:10,paddingVertical:5,backgroundColor:"#fff"}}>
                <Text style={{fontWeight:"bold",fontSize:16}}>Drudge Report</Text>
                <Text style={{fontWeight:"400",fontSize:14}}>Lorem ipsum dolore Loreme ipsum dolore</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor:"#ffffff9e"
  },
  headcontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'left',
    marginTop: 56,
    marginBottom: 8,
    
  },
  boldh1: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  boldh2: {
    fontSize: 24,
  },
  boldl1: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 28,
  },
  iconContainer: {
    padding: 8,
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
  daysectionContainer: {
    marginBottom: 26,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  pictureCon: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
    padding: 8,
  },
  picDescription: {
    fontSize: 14,
    color: '#555',
    padding: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 8,
  },
  verticalElement: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  verticalElementTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  verticalElementImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  verticalElementName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 15,
  },
  verticalElementDescription: {
    fontSize: 14,
    color: '#555',
    marginLeft: 15,
  },
  verticalElementViewsContainer: {
    // alignItems: 'flex-end',
    marginLeft: 40,

  },
  viewsText: {
    fontSize: 14,
    color: '#12734cde',
    // marginLeft: -500,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#d0cdcd6e',
    marginVertical: 4,
  },
  topReadSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  topReadContainer: {
    marginTop: 8,
  },
  numberContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'green',
    padding: 4,
    borderRadius: 250,
  },
  numberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  slantedLine: {
    position: 'absolute',
    bottom: 0,
    left: 14,
    width: 16,
    height: 3,
    marginTop: 20,
  },
  moretop: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#4169E1',
    marginBottom: 8,
  },
  moreto: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#4169E1',
    marginTop: 7,
    marginBottom: 13,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 20,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'row',
    backgroundColor: '#f0f0f063',
    paddingHorizontal: 19,
    padding: 5,
    borderRadius: 70,
    marginLeft: 32,

  },

  buttonText: {
    marginLeft: 8,
    color: '#4169E1',
  },
});

export default Explore;
