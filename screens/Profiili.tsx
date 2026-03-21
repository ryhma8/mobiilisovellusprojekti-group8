import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import { MyChart } from '../components/chart';
import { ProfiiliValikkoModal } from '../components/ProfiiliModal';
import { LuoProfiiliValikkoModal } from '../components/LuoProfiiliModal';
import * as SQLite from 'expo-sqlite';
import { Database, purgeDb, RefreshUIData } from '../Database/Database';

const { width, height } = Dimensions.get("window");


type Props = NativeStackScreenProps<RootStackParamList,'Profiili'>

export function Profiili({ route }: Props) {

  const [Infogiven, setInfogiven] = useState(false) //refreshiä varten, tällä checkillä saadaan sivu latautumaan uudelleen tietojen asettamisen jälkeen
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [userId, setUserId] = useState<number | undefined>() // conditional renderöintiä varten
  const [modalVisible, setModalVisible] = useState(false);
  
    useEffect(() => {
      Database({db, setDb, setUserId}) // useeffectilla ladataan db, eli tietokanta usetstate muuttujaan
      //purgeDb() //dev tarkoituksiin
      console.log("useeffect")
    }, []);

    if(Infogiven)
    {
      Database({db, setDb, setUserId})
      setInfogiven(false)
    }

  if(!userId)
  {
    return (
      <View style={styles.container}>
            <LuoProfiiliValikkoModal
            modalVisible= {modalVisible}
            setModalVisible={setModalVisible}
            db={db}
            setDb = {setDb}
            setInfogiven={setInfogiven}
            ></LuoProfiiliValikkoModal>
            <MyChart></MyChart>
      </View>
    );
  }
  else
  {
return (
      <View style={styles.container}>
            <ProfiiliValikkoModal
            modalVisible= {modalVisible}
            setModalVisible={setModalVisible}
            db={db}
            ></ProfiiliValikkoModal>
            <MyChart></MyChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
chart: {
    flex: 1
  },
})