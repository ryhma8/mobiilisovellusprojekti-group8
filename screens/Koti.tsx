import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { loadUserData } from '../Database/Database';
import { useSQLiteContext } from 'expo-sqlite';
import { UserData, UserWeight } from '../types/database';
import { LuoProfiiliValikkoModal } from '../components/LuoProfiiliModal';


export function Koti() {

  const db = useSQLiteContext(); //ladataan database

  const [userData, setUserData] = useState<UserData[]>([])
  const [UserWeight, setUserWeight] = useState<UserWeight[]>([])
  const [modalVisible, setModalVisible] = useState(true);// jos ei käyttäjää niin forcetetaan modali auki.
  const [Infogiven, setInfogiven] = useState(false) //refreshiä varten, tällä checkillä saadaan sivu latautumaan uudelleen tietojen asettamisen jälkeen

   if(Infogiven)
      {
        loadUserData(db, setUserData, setUserWeight)
        setInfogiven(false)
      }

  useEffect(() => {
            loadUserData(db, setUserData, setUserWeight)
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