import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { laskeAvgNopeus, laskeLenkinKalorit, laskeJuoksujenAvgMatka, LaskeMatkaKoordinaateista } from '../mathFunctions/functions';
import { Database } from '../Database/Database';
import { UserData } from '../types/database';
import * as SQLite from 'expo-sqlite';

interface coordlist 
{
    "lat": number
    "lng": number
}

export function Koti() {

  const dummydata = 
[
    {"lat": 65.001916 ,"lng": 25.454775},
    {"lat": 65.016146 ,"lng": 25.483967},
    {"lat": 65.021916 ,"lng": 25.455775},
    {"lat": 65.036146 ,"lng": 25.486967},
    {"lat": 65.041916 ,"lng": 25.457775},
    {"lat": 65.056146 ,"lng": 25.488967},
    {"lat": 65.061916 ,"lng": 25.494775},
    {"lat": 65.076146 ,"lng": 25.500000},
]

  const[TempResult, setTempResult] = useState(0) //hävitä myöhemmin tämä, testiä varten
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [userData, setUserData] = useState<UserData[]>([])

  useEffect(() => {
            Database({db, setDb, setUserData}) // useeffectilla ladataan db, eli tietokanta usetstate muuttujaan
          }, []);
  

  return (
    <View style={style.container}>
      <Button
      onPress={() => setTempResult(LaskeMatkaKoordinaateista(dummydata))}
      title="avg nopeus testi (5 sekuntia 14 metriä"
      color="#841584"
      ></Button>
      <Button
      onPress={() => setTempResult(laskeLenkinKalorit(70, 60, 3.5))}
      title="kalorit testi (70kg 60min 3.5mps)"
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