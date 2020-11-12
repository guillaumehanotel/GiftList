import React from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {setYear} from 'store/year/actions';
import {useNavigation} from '@react-navigation/native';

const YearList = () => {
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const year = useSelector((state: RootState) => state.year.year);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View>
      <Text>Year List</Text>
      <Picker
        selectedValue={year}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue) => {
          dispatch(setYear(itemValue as number));
          navigation.goBack();
        }}>
        {years.map((item, itemIndex) => (
          <Picker.Item key={itemIndex} label={item.toString()} value={item} />
        ))}
      </Picker>
    </View>
  );
};

export default YearList;
