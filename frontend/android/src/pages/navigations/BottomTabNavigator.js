import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens
import Explore from '../screens/Explore';
import SearchScreen from '../screens/SearchScreen';
import EditScreen from '../screens/Edit';
import MoreScreen from '../screens/moreScreen';
import SavedScreen from '../screens/savedScreen';
import LoginScreen from '../Auth/LoginScreen';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Explore: { iconName: 'globe', label: 'Explore' },
  saved: { iconName: 'bookmark-o', label: 'Saved' },
  Search: { iconName: 'search', label: 'Search' },
  edit: { iconName: 'edit', label: 'Edit' },
  more: { iconName: 'bars', label: 'More' },
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 0,
        paddingVertical: 10,
        marginTop: 20,
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex:100,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const { iconName, label } = tabIcons[route.name] || { iconName: 'question', label: 'Question' };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center' }}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
          >
            <View style={{ backgroundColor:isFocused ?"#f0f0f0f7":null,paddingHorizontal:15,borderRadius:40,paddingVertical:3}}>
            <FontAwesome name={iconName} size={18} color={isFocused ? 'blue' : 'gray'} style={{ marginLeft: 5,  }} />

            </View>
            <Text style={{ color: isFocused ? 'blue' : 'gray', marginLeft: 5 }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="saved" component={SavedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="edit" component={EditScreen} />
      <Tab.Screen name="more" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
