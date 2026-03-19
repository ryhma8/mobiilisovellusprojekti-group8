import React, { useState } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { laskeAvgNopeus, laskeLenkinKalorit, laskeJuoksujenAvgMatka } from '../mathFunctions/functions';

export function Koti() {

  const[TempResult, setTempResult] = useState(0) //hävitä myöhemmin tämä, testiä varten

  return (
    <View style={style.container}>
      <Button
      onPress={() => setTempResult(laskeAvgNopeus(0, 5, 0, 14))}
      title="avg nopeus testi (5 sekuntia 14 metriä"
      color="#841584"
      ></Button>
      <Button
      onPress={() => setTempResult(laskeLenkinKalorit(70, 60, 3.5))}
      title="kalorit testi (70kg 60min 2.5mps)"
      color="#841584"
      ></Button>
      <Button
      onPress={() => setTempResult(laskeJuoksujenAvgMatka([7.54, 5, 12.54, 8.6]))}
      title="avg matka testi [7.54km, 5km, 12.54km, 8.6km]"
      color="#841584"
      ></Button>
      <Text>{TempResult}</Text>
    </View>
  );
}

const style = StyleSheet.create({
container: 
{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
},
text: 
{
  fontSize: 24,
  fontWeight: 'bold',
},
})