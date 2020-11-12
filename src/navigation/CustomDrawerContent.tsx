import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import React from 'react';
import {useDispatch} from 'react-redux';
import {logout} from 'store/auth/actions';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Se déconnecter"
        style={{marginTop: 380}}
        onPress={() => dispatch(logout())}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
