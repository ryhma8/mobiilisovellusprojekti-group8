import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button, Pressable, TextInput, Dimensions, Image} from 'react-native';
import { AddNewWeight, loadNewestWeight, loadUserData } from '../Database/Database';
import { useSQLiteContext } from 'expo-sqlite';
import { UserData } from '../types/database';
import { LuoProfiiliValikkoModal } from '../components/LuoProfiiliModal';
//import { JogHistory } from '../components/JogHistory';
import { jogCoordinates } from '../types/jogCoordinates';
import { WeightAndJogdata } from '../types/JogData';
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';

const { width, height } = Dimensions.get("window");

export function Koti() {

  

  const db = useSQLiteContext(); //ladataan database

  const [paino, setPaino] = useState<string | null>(null)
  const [NewestWeight, setNewestWeight] = useState<WeightAndJogdata[]>([])
  const [userData, setUserData] = useState<UserData[]>([])
  const [UserWeight, setUserWeight] = useState<WeightAndJogdata[]>([])
  const [Jogdata, setJogData] = useState<WeightAndJogdata[]>([])
  const [modalVisible, setModalVisible] = useState(true);// jos ei käyttäjää niin forcetetaan modali auki.
  const [Infogiven, setInfogiven] = useState(false) //refreshiä varten, tällä checkillä saadaan sivu latautumaan uudelleen tietojen asettamisen jälkeen

  async function setValues()
    {
      if(paino != null && paino != undefined && paino.length > 0)
      {
        try 
        {
          console.log("anw called", paino)
            await AddNewWeight(Number(paino), db)
            setInfogiven(true)
        } catch (error) 
        {
          alert("tietokantavirhe") 
        }
      }
      else
        {
          alert("Täytä kaikki kentät.") 
        }
      }

   if(Infogiven)
      {
        console.log("info is given!")
        loadUserData(db, setUserData, setUserWeight, setJogData)
        loadNewestWeight(db, setNewestWeight)
        setPaino(null)
        setInfogiven(false)
      }

  useEffect(() => {
            loadUserData(db, setUserData, setUserWeight, setJogData)
            loadNewestWeight(db, setNewestWeight)
          }, []);

        
  

  if(userData[0]?.UserID) // kysymysmerkki estää sen, että jos/kun usedata on undefined, ei tule runtime erroria.
  {
   return (
<View style={styles.container}>
  
    <View style={styles.textarea}>
      <Image
    source={require('../assets/running-1-svgrepo-com.png')}
    style={styles.image}>
    </Image>

          <View style={styles.flexMaster}>
          
                          <View style={styles.flexSingle}>
                            
                              <View style={styles.textRow}>
                                <Text  style= {styles.text}> viimeisin lenkki: </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.text}> Seuraava salitreeni: </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.text}> Nykyinen paino: </Text>
                              </View>
                          </View>

                          <View style={styles.flexSingle}>
                              
                              <View style={styles.textRow}>
                                <Text  style= {styles.textName}> {Jogdata[0]?.Jog_Date}, {Jogdata[0]?.length_Km.toFixed(2)} km  </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.textName}> {} </Text>
                              </View>

                              <View style={styles.textRow}>                    
                                <Text  style= {styles.textName}> {NewestWeight[0]?.Weight_Kg} kg </Text>
                              </View>
                       
                          </View> 
          </View> 
      

        <View style={styles.PressableContainer}> 
          <TextInput
              keyboardType="numeric"
              style= {styles.textinput}
              onChangeText={setPaino}
              placeholder='Anna uusi paino:'>    
          </TextInput>
          <Pressable
              style= {styles.Pressable} 
              onPress={() => setValues()}>
              <Text style={styles.textPressableBlack}>Tallenna</Text>
          </Pressable>
        </View>


    </View>  
   
  </View>
   );
  }
  else
      return (
                <View style={styles.containerNodata}>
                      <LuoProfiiliValikkoModal
                      modalVisible= {modalVisible}
                      setModalVisible={setModalVisible}
                      setInfogiven={setInfogiven}
                      ></LuoProfiiliValikkoModal>


                </View>

              );
}

const styles = StyleSheet.create({
image:
{
margin: height/20,
width: width/5,
height: height/10
},
container: 
{
  flex: 1,
  backgroundColor: '#9F6BFB',
},
text: 
{
  fontSize: horizontalScale(16),
  fontWeight: 'bold',
},
textinput:
{
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: width/3,
    height: height/20,
    color: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
containerNodata: 
{
  flex: 1,
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#9F6BFB',
},
textPressableBlack: 
  {
    fontSize: horizontalScale(16),
    fontWeight: 'bold',
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
    flexDirection: 'column',
    gap: width/15,
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
    height: height/1.5
  },
flexMaster: 
  {
    margin: width/15,
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
textName: 
  {
    fontSize: horizontalScale(16),
    fontWeight: 'bold'
  },
})