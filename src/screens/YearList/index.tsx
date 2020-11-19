import React from 'react';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {setYear} from 'store/year/actions';
import {useNavigation} from '@react-navigation/native';
import {Content, Form, Picker, Item, Icon} from 'native-base';
import {fetchGiftsByYear} from 'store/gift/actions';
import {User} from '@react-native-community/google-signin';

const YearList = () => {
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const year = useSelector((state: RootState) => state.year.year);
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const _changeYear = async (newYear: number) => {
    dispatch(setYear(newYear));
    dispatch(fetchGiftsByYear(user, newYear));
    navigation.goBack();
  };

  return (
    <Content>
      <Text>Année de la liste de Noël</Text>
      <Form>
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: undefined}}
            placeholder="Select year"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={year}
            onValueChange={(value) => _changeYear(value)}>
            {years.map((item, itemIndex) => (
              <Picker.Item
                key={itemIndex}
                label={item.toString()}
                value={item}
              />
            ))}
          </Picker>
        </Item>
      </Form>
    </Content>
  );
};

export default YearList;
