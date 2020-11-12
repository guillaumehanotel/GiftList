import React, {useCallback, useEffect, useRef} from 'react';
import {TouchableOpacity, StyleSheet, Text, Animated} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

export type ButtonNewItemType = {
  label: string;
  icon: string;
  callbackComponent: Function;
};

interface ButtonNewItemProps {
  index: number;
  item: ButtonNewItemType;
  displayBtnNewItem: boolean;
}

const ButtonNewItem = ({item, displayBtnNewItem}: ButtonNewItemProps) => {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fade = useCallback(
    (toValue) => {
      Animated.timing(fadeAnim, {
        toValue: toValue,
        duration: 400,
        useNativeDriver: true,
      }).start();
    },
    [fadeAnim],
  );

  useEffect(() => {
    fade(displayBtnNewItem ? 1 : 0);
  }, [fade, displayBtnNewItem]);

  return (
    <Animated.View style={[styles.animatedView, {opacity: fadeAnim}]}>
      <Text style={styles.buttonNewItemLabel}>{item.label}</Text>
      <AnimatedTouchable
        onPress={() => navigation.navigate(item.callbackComponent.name)}
        style={styles.buttonNewItem}>
        <Icon name={item.icon} type="font-awesome-5" color="white" size={18} />
      </AnimatedTouchable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonNewItem: {
    backgroundColor: 'grey',
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNewItemLabel: {
    height: 25,
    width: 150,
    textAlign: 'center',
    lineHeight: 25,
    backgroundColor: 'rgba(35,35,35,0.8)',
    color: 'white',
    alignSelf: 'center',
  },
});

export default ButtonNewItem;
