import React from 'react';
import {TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import UserList from '@screens/UserList';
import YearList from '@screens/YearList';
import GiftList from '@screens/GiftList';
import Stats from '@screens/Stats';
import {RootState} from 'store';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const TopBar = createMaterialTopTabNavigator();

const TopTarNavigation = () => (
  <TopBar.Navigator>
    <TopBar.Screen name="Personnes" component={UserList} />
    <TopBar.Screen name="Cadeaux" component={GiftList} />
    <TopBar.Screen name="Stats" component={Stats} />
  </TopBar.Navigator>
);

const StackNavigation = () => {
  const year = useSelector((state: RootState) => state.year.year);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopTarNavigation"
        component={TopTarNavigation}
        options={({navigation}) => ({
          title: 'Gift List ' + year.toString(),
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <Icon name="gift" type="font-awesome" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigation = () => (
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="UserList" component={StackNavigation} />
      <Drawer.Screen name="YearList" component={YearList} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default DrawerNavigation;
