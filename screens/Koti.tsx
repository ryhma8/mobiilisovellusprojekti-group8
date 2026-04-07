import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { laskeAvgNopeus, laskeLenkinKalorit, laskeJuoksujenAvgMatka, LaskeMatkaKoordinaateista } from '../mathFunctions/functions';
import { Database } from '../Database/Database';
import { UserData, UserWeight } from '../types/database';
import * as SQLite from 'expo-sqlite';
import { LuoProfiiliValikkoModal } from '../components/LuoProfiiliModal';

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

  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [userData, setUserData] = useState<UserData[]>([])
  const [UserWeight, setUserWeight] = useState<UserWeight[]>([])
  const [modalVisible, setModalVisible] = useState(true);// jos ei käyttäjää niin forcetetaan modali auki.
  const [Infogiven, setInfogiven] = useState(false) //refreshiä varten, tällä checkillä saadaan sivu latautumaan uudelleen tietojen asettamisen jälkeen

   if(Infogiven)
      {
        Database({db, setDb, setUserData, setUserWeight})
        setInfogiven(false)
      }

  useEffect(() => {
            Database({db, setDb, setUserData, setUserWeight}) // useeffectilla ladataan db, eli tietokanta usetstate muuttujaan
          }, []);
  

  if(userData[0]?.UserID) // kysymysmerkki estää sen, että jos/kun usedata on undefined, ei tule runtime erroria.
  {
   return (
   <View style={style.container}>
    
   <Text> Tämänhetkinen painosi: {UserWeight[0].Weight_Kg} kg</Text>
   <Text> viimeisin lenkki: //lenkki pvm, lenkin pituus//</Text>
   <Text> seuraava salitreeni: //seuraavan salitreeniin pvm//</Text>
   </View>
   );
  }
  else
      return (
                <View style={style.containerNodata}>
                      <LuoProfiiliValikkoModal
                      modalVisible= {modalVisible}
                      setModalVisible={setModalVisible}
                      db={db}
                      setDb = {setDb}
                      setInfogiven={setInfogiven}
                      ></LuoProfiiliValikkoModal>
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
containerNodata: 
{
  flex: 1,
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#9F6BFB',
},
})