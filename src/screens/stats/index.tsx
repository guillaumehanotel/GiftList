import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import useFetch from 'use-http';

const data = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: '#ffffff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const GiftList = () => {
  const [nbDays, setNbDays] = useState(0);

  const {get, response, error} = useFetch(
    'https://christmas-days.anvil.app/_/api',
  );

  useEffect(() => {
    (async () => {
      const days = await get('/get_days');
      if (response.ok) {
        setNbDays(days[Object.keys(days)[0]]);
      } else {
        console.log(error);
      }
    })();
  }, [error, get, response]);

  return (
    <View>
      <Text>Nombre de jours avant Noël : {nbDays}</Text>

      <Text>Budget par Personne :</Text>
      <PieChart
        data={data}
        width={400}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

export default GiftList;
