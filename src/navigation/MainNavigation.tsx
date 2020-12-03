import React from 'react';
import {TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {Container, Root} from 'native-base';
import {RootState} from 'store';
import UserList from 'screens/person/List';
import YearList from '@screens/YearList';
import GiftList from 'screens/gift/List';
import Stats from '@screens/stats';
import Loading from '@screens/loading';
import GoogleLogin from 'screens/auth/GoogleLogin';
import CustomDrawerContent from './CustomDrawerContent';
import FormPerson from 'screens/person/Form';
import ChooseAvatar from 'screens/person/Form/ChooseAvatar';
import FormGift from 'screens/gift/Form';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const TopBar = createMaterialTopTabNavigator();
const RootStack = createStackNavigator();

const TopTarNavigation = () => (
  <TopBar.Navigator
    tabBarOptions={{
      indicatorStyle: {
        backgroundColor: 'green',
      },
    }}>
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
          title: 'Liste Noël ' + year.toString(),
          headerStyle: {
            backgroundColor: '#de0505',
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <Icon name="gifts" type="font-awesome-5" color={'white'} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="FormPerson"
        component={FormPerson}
        options={{headerTitle: 'Ajouter une personne'}}
      />
      <Stack.Screen
        name="ChooseAvatar"
        component={ChooseAvatar}
        options={{headerTitle: 'Choisir une image'}}
      />
      <Stack.Screen
        name="FormGift"
        component={FormGift}
        options={{headerTitle: 'Ajouter un cadeau'}}
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
        name="Liste Noël "
        options={{headerShown: false, title: 'Liste Noël ' + year.toString()}}
        component={StackNavigation}
      />
      <Drawer.Screen name="Gérer mes listes" component={YearList} />
    </Drawer.Navigator>
  );
};

const RootStackNavigation = () => {
  const isLoaded = useSelector((state: RootState) => state.auth.isLoaded);
  const {user} = useSelector((state: RootState) => state.auth.user) || {};

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Container>
        <Root>
          <RootStack.Navigator headerMode="none">
            {user == null ? (
              <RootStack.Screen name="GoogleLogin" component={GoogleLogin} />
            ) : (
              <RootStack.Screen name="Drawer" component={DrawerNavigation} />
            )}
          </RootStack.Navigator>
        </Root>
      </Container>
    </NavigationContainer>
  );
};

export default RootStackNavigation;
