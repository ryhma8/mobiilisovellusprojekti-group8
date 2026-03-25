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
import { UserData } from '../types/database';
import { Dropdown } from 'react-native-element-dropdown';

const { width, height } = Dimensions.get("window");


type Props = NativeStackScreenProps<RootStackParamList,'Profiili'>


const sivut = [
    { label: 'lenkit 7vrk', value: 'lenkit 7vrk' },
    { label: 'Paino', value: 'Paino' },
    { label: 'Profliili', value: 'Profiili' },
  ];

export function Profiili({ route }: Props) {

   useEffect(() => {
          Database({db, setDb, setUserData}) // useeffectilla ladataan db, eli tietokanta usetstate muuttujaan
          //purgeDb(db)
        }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [Infogiven, setInfogiven] = useState(false) //refreshiä varten, tällä checkillä saadaan sivu latautumaan uudelleen tietojen asettamisen jälkeen
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [userData, setUserData] = useState<UserData[]>([])
  
    if(Infogiven)
    {
      Database({db, setDb, setUserData})
      setInfogiven(false)
    }

  if(!userData[0]?.UserID) // kysymysmerkki estää sen, että jos/kun usedata on undefined, ei tule runtime erroria.
  {
    return (
      <View style={styles.containerNodata}>
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
  else
  {
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
                                <Text  style= {styles.textName}> {userData[0].FirstName} </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.textName}> {userData[0].LastName} </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.textName}> {userData[0].Height_Cm} cm </Text>
                              </View>

                              <View style={styles.textRow}>                    
                                <Text  style= {styles.textName}> {userData[0].Weight_Kg} kg </Text>
                              </View>
                       
                          </View>  
                       
                      </View>

      <ProfiiliValikkoModal
          modalVisible= {modalVisible}
          setModalVisible={setModalVisible}
          db={db}
      ></ProfiiliValikkoModal>   

        <Dropdown style={styles.navBox}
            
          data={sivut}
          maxHeight={height-height/20}
          placeholderStyle={styles.itemtext}
          selectedTextStyle={styles.itemtext}
          iconColor={'#ffffff'}
          itemTextStyle={styles.itemtext}
          itemContainerStyle={styles.list}
          labelField="label"
          valueField="value"
          placeholder={'Tilastot'}
          onChange={item => {} }
       >
       </Dropdown>               

           
          </View>             
          
      </View>
    );
  }
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
    alignItems: 'center'
  },
})
