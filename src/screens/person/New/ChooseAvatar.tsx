import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import images from 'assets';
import {useNavigation} from '@react-navigation/native';

const ChooseAvatar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.avatarList}>
      {Object.keys(images).map((image, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('CreatePerson', {avatar: image})}>
          {/* @ts-ignore */}
          <Image style={styles.avatar} source={images[image]} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  avatar: {
    width: 105,
    height: 105,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.4)',
    marginTop: 18,
  },
});

export default ChooseAvatar;
