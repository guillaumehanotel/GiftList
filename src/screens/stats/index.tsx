import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import useFetch from 'use-http';
import {Gift} from 'screens/gift';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import _ from 'lodash';
import {Person} from 'screens/person';
import {makeColor} from 'helpers';

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
  const [totalCost, setTotalCost] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [chartData, setChartData] = useState<any>([]);
  const gifts: Gift[] = useSelector((state: RootState) => state.gift.gifts);
  const persons: Person[] = useSelector(
    (state: RootState) => state.person.persons,
  );
  const {get, response, error} = useFetch(
    'https://christmas-days.anvil.app/_/api',
  );

  useEffect(() => {
    let costTotal = 0;
    gifts.map((gift: Gift) => {
      costTotal += gift.price;
    });
    setTotalCost(costTotal);
  }, [gifts]);

  useEffect(() => {
    const personsKey = _.uniqBy(gifts, 'person').map(
      (gift: Gift) => gift.person,
    );
    let budgetTotal = 0;
    const personsBudget = persons
      .filter((person: Person) => {
        return personsKey.includes(person.key);
      })
      .map((person: Person, index: number) => {
        budgetTotal += person.budget;
        const personGifts = gifts.filter(
          (gift: Gift) => gift.person === person.key,
        );
        let personGiftsCost = 0;
        personGifts.map((gift: Gift) => (personGiftsCost += gift.price));
        return {
          name: person.name,
          totalCost: personGiftsCost,
          color: 'hsl(' + makeColor(index, persons.length) + ',100%,50%)',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        };
      });
    setChartData(personsBudget);
    setTotalBudget(budgetTotal);
  }, [gifts, persons]);

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
    <View style={styles.Stats}>
      <Text style={styles.StatLine}>Nombre de jours avant Noël : {nbDays}</Text>
      <Text style={styles.StatLine}>
        Budget Total Accordé: {totalBudget.toFixed(2).replace('.', ',')} €
      </Text>
      <Text style={styles.StatLine}>
        Coût Total : {totalCost.toFixed(2).replace('.', ',')} €
      </Text>

      <Text style={styles.StatLine}>Coût par Personne :</Text>
      <PieChart
        style={{flex: 1, alignSelf: 'center'}}
        data={chartData}
        width={300}
        height={220}
        chartConfig={chartConfig}
        accessor="totalCost"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Stats: {
    flex: 1,
    backgroundColor: 'white',
  },
  StatLine: {
    padding: 5,
    fontSize: 16,
  },
});

export default GiftList;
