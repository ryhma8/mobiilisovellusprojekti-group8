import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, Dimensions, Pressable} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import { MyChart } from '../components/chart';
import { ProfiiliValikkoModal } from '../components/ProfiiliModal';
import { LuoProfiiliValikkoModal } from '../components/LuoProfiiliModal';
import * as SQLite from 'expo-sqlite';
import { Database, purgeDb } from '../Database/Database';
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { UserData, UserWeight } from '../types/database';
import { Dropdown } from 'react-native-element-dropdown';
import { ChartsModal } from '../components/ChartsModal';

const { width, height } = Dimensions.get("window");


type Props = NativeStackScreenProps<RootStackParamList,'Profiili'>


const sivut = [
    { label: 'lenkit 7vrk', value: 'lenkit 7vrk' },
    { label: 'Paino', value: 'Paino' },
    { label: 'Profliili', value: 'Profiili' },
  ];

    const testiObjekti = 
{
    Time: 60,
    distanceJogged: 11,
    date: "14/01/2025"
}
const dummyData = 
[

]
const dummyData2 = 
[
  {
    Time: 55,
    distanceJogged: 9,
    date: "10/01/2025"
  },
  {
    Time: 67,
    distanceJogged: 10,
    date: "11/01/2025"
  },
   {
    Time: 56,
    distanceJogged: 12,
    date: "12/01/2025"
  },
  {
    Time: 60,
    distanceJogged: 11,
    date: "13/01/2025"
  },
  
   {
    Time: 56,
    distanceJogged: 12,
    date: "15/01/2025"
  },
  {
    Time: 71,
    distanceJogged: 11,
    date: "17/01/2025"
  },
  {
    Time: 66,
    distanceJogged: 11,
    date: "19/01/2025"
  },
]


export function Profiili({ route }: Props) {

   useEffect(() => {
          Database({db, setDb, setUserData, setUserWeight}) // useeffectilla ladataan db, eli tietokanta usetstate muuttujaan
          //purgeDb(db)
        }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [ChartsVisible, setChartsVisible] = useState(false);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [userData, setUserData] = useState<UserData[]>([])
  const [UserWeight, setUserWeight] = useState<UserWeight[]>([])

return (
      
      <View style={styles.container}>

      <View style={styles.textarea}>
                          <View style={styles.flexMaster}>
          
                          <View style={styles.flexSingle}>
                              <View style={styles.textRow}>
                                <Text  style= {styles.text}> Nimi: </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.text}> Sukunimi: </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.text}> Pituus: </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.text}> paino: </Text>
                              </View>
                          </View>

                          <View style={styles.flexSingle}>
                              <View style={styles.textRow}>
                                <Text  style= {styles.textName}> {userData[0]?.FirstName} </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.textName}> {userData[0]?.LastName} </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.textName}> {userData[0]?.Height_Cm} cm </Text>
                              </View>

                              <View style={styles.textRow}>                    
                                <Text  style= {styles.textName}> {UserWeight[0]?.Weight_Kg} kg </Text>
                              </View>
                       
                          </View>  
                       
                      </View>

      <ProfiiliValikkoModal
          modalVisible= {modalVisible}
          setModalVisible={setModalVisible}
          db={db}
      ></ProfiiliValikkoModal> 

      <ChartsModal
        ChartsVisible= {ChartsVisible}
        setChartsVisible={setChartsVisible}
        JogDataArr= {dummyData2}>       
      </ChartsModal> 

      <View style={styles.PressableContainer}>
        <Pressable
         style= {styles.Pressable} 
          onPress={() => setChartsVisible(true)}>
          <Text style={styles.textClose}>Lenkit 7vrk</Text>
        </Pressable>

        <Pressable
         style= {styles.Pressable} 
          onPress={() => console.log("")}>
          <Text style={styles.textClose}>Paino</Text>
        </Pressable>     
      </View> 
                     
          </View>             
          
      </View>
    );
  }


const styles = StyleSheet.create({
container: 
{
  flex: 1,
  backgroundColor: '#9F6BFB',
},
navBox: 
  {
    marginBottom: 20,
    width: width/3,
    height: height/20,
    backgroundColor: '#9F6BFB',
    borderRadius: 10,

  },
containerNodata: 
{
  flex: 1,
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#9F6BFB',
},
textPressable: 
  {
    fontSize: horizontalScale(16),
    fontWeight: 'bold',
    color: '#ffffff'
  },
Pressable2: 
  {
    marginBottom: width/20,
    borderRadius: 10,
    height: height/20,
    width: width/3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9F6BFB'
  },
chart: {
    flex: 1
  },
text: 
  {
    fontSize: horizontalScale(16)
  },
textName: 
  {
    fontSize: horizontalScale(18),
    fontWeight: 'bold'

  },
  flexMaster: 
  {
    margin: width/15,
    gap: width/15,
    flexDirection: 'row'
  },
  flexSingle: 
  {
    margin: width/15,
    gap: width/15,
  },
  textRow: 
  {
    gap: width/15,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  itemtext:
  {
    margin: 2,
    color: '#ffffff',
    fontSize: horizontalScale(18) // stackista lainattu funktio responsiviiselle fonttikoolle
  },
  list:
  {
    backgroundColor: '#9F6BFB',
    fontSize: horizontalScale(18),
    borderBlockColor: '#000000',
    borderWidth: 1,
    margin: 1
  },
  textarea: 
  {
    backgroundColor: '#f9f5ff',
    borderColor: '#9F6BFB',
    borderWidth: 1,
    borderRadius: 10,
    margin: width/20,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    height: height/1.8
  },
  textClose: 
  {
    fontSize: horizontalScale(16),
    fontWeight: 'bold'
  },
  Pressable: 
  {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: height/20,
    width: width/3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  PressableContainer: 
  {
    flex: 1,
    flexDirection: 'row',
    gap: width/10,
  },
})
