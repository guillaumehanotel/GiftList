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
import Loading from 'screens/Loading';
import GoogleLogin from 'screens/GoogleLogin';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const TopBar = createMaterialTopTabNavigator();
const RootStack = createStackNavigator();

const TopTarNavigation = () => (
  <TopBar.Navigator>
    <TopBar.Screen name="Personnes" component={UserList} />
    <TopBar.Screen name="Cadeaux" component={GiftList} />
    <TopBar.Screen name="Stats" component={Stats} />
  </TopBar.Navigator>
);

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopTarNavigation"
        component={TopTarNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigation = () => {
  const year = useSelector((state: RootState) => state.year.year);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={'Liste Noël ' + year}
        component={StackNavigation}
        options={({navigation}) => ({
          title: 'Liste Noël ' + year.toString(),
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <Icon name="gift" type="font-awesome-5" />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen name="Gérer mes listes" component={YearList} />
    </Drawer.Navigator>
  );
};

const RootStackNavigation = () => {
  const isLoaded = useSelector((state: RootState) => state.auth.isLoaded);
  const user = useSelector((state: RootState) => state.auth.user);
  if (isLoaded) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none">
        {user == null ? (
          <RootStack.Screen name="GoogleLogin" component={GoogleLogin} />
        ) : (
          <RootStack.Screen name="Drawer" component={DrawerNavigation} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigation;
