import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import RootStackNavigation from '@navigation/MainNavigation';
import store from 'store';

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <RootStackNavigation />
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
