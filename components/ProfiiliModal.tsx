import React, {useState} from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, Button } from 'react-native';
import { ProfiiliModalProps } from '../types/ModalProps'; 
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { AddNewWeight, loadUserData, updateProfile } from '../Database/Database';
import { useSQLiteContext } from 'expo-sqlite';
import { UserData } from '../types/database';
import { WeightAndJogdata } from '../types/JogData';

const { width, height } = Dimensions.get("window");

export function ProfiiliValikkoModal({modalVisible, setModalVisible, setInfogiven}: ProfiiliModalProps) {

  const db = useSQLiteContext(); //ladataan database konstekstista
  const [ikä, setikä] = useState<string>()
  const [paino, setPaino] = useState<string>()
  const [pituus, setPituus] = useState<string>()
  const [etuNimi, setetuNimi] = useState<string>()
  const [sukuNimi, setsukuNimi] = useState<string>()

  const [userData, setUserData] = useState<UserData[]>([])
  const [UserWeight, setUserWeight] = useState<WeightAndJogdata[]>([])
  const [Jogdata, setJogData] = useState<WeightAndJogdata[]>([])

  async function setValues()
  {
    console.log("setValues called", paino + " " + pituus + " " + ikä)
    if(paino != null && paino != undefined)
    {
      try 
      {
        console.log("anw called", paino)
          await AddNewWeight(Number(paino), db)
          setInfogiven(true)
          setModalVisible(false)
      } catch (error) 
      {
        alert("tietokantavirhe") 
      }
    }
    else
      {
        alert("Täytä kaikki kentät.") 
      }

    if(ikä != null && ikä != undefined && pituus != null && pituus != undefined && etuNimi != null && etuNimi != undefined && sukuNimi != null && sukuNimi != undefined)
    {
      try 
      {
          await updateProfile(Number(ikä), Number(pituus), etuNimi, sukuNimi, db)
          setModalVisible(false)
      } catch (error) 
      {
        console.log(error)
        alert("tietokantavirhe") 
      }     
    }
  else
      {
        alert("Täytä kaikki kentät.") 
      } 
  }

  return (
    <View style={styles.containerAsButton}> 
      <Pressable
                style= {styles.Pressable2} 
                onPress={() => setModalVisible(true)}>
         <Text style={styles.textPressable}>Muokkaa</Text>
      </Pressable>
      
       <Modal
        animationType="slide"
        visible={modalVisible}>

          <View style={styles.modalView}>
                <View style={styles.flex}>

                    <TextInput
                    keyboardType="numeric"
                    style= {styles.textinput}
                    onChangeText={setPaino}
                    placeholder='Anna painosi:'>    
                    </TextInput>

                    <TextInput
                    keyboardType="numeric"
                    style= {styles.textinput}
                    onChangeText={setPituus}
                    placeholder='Anna pituutesi:'>
                    </TextInput>

                    <TextInput
                    style= {styles.textinput}
                    onChangeText={setetuNimi}
                    placeholder='Anna etunimesi:'>    
                    </TextInput>

                    <TextInput
                    style= {styles.textinput}
                    onChangeText={setsukuNimi}
                    placeholder='Anna sukunimesi:'>
                    </TextInput>

                    <TextInput
                    keyboardType="numeric"
                    style= {styles.textinput}
                    onChangeText={setikä}
                    placeholder='Anna ikäsi:'>
                    </TextInput>
            </View>
                
            <View style={styles.PressableContainer}>   
                <Pressable
                style= {styles.Pressable} 
                onPress={() => setValues()}>
                    <Text style={styles.textPressableBlack}>Tallenna tietosi</Text>
                </Pressable>

                <Pressable
                style= {styles.Pressable} 
                onPress={() => setModalVisible(false)}>
                    <Text style={styles.textPressableBlack}>Sulje modal</Text>
                </Pressable>     
            </View>

          </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textPressable: 
  {
    fontSize: horizontalScale(16),
    fontWeight: 'bold',
    color: '#ffffff'
  },
  textPressableBlack: 
  {
    fontSize: horizontalScale(16),
    fontWeight: 'bold',
  },
  text: 
  {
    fontSize: horizontalScale(16)
  },
  flex: 
  {
    gap: 30,
    flexDirection: 'column',
    alignItems: 'center',
  },
  pressableRow: 
  {
    gap: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinput: 
  {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: width/1.4,
    color: "#000000"
  },
  containerAsButton: 
  {

    alignItems: 'center',
    justifyContent: 'center',
    height: height/15,
    width: width/3,
  },
  PressableContainer: 
  {
    flex: 1,
    flexDirection: 'row',
    gap: width/10,
  },
  Pressable: 
  {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: height/20,
    width: width/3,
    justifyContent: 'center',
    alignItems: 'center',
  },
   Pressable2: 
  {
    borderRadius: 10,
    height: height/20,
    width: width/3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9F6BFB'
  },
  modalView: 
  {
    gap: height/20,
    height: height/1.8,
    marginTop: height/10,
    margin: width/15,
    backgroundColor: '#9F6BFB',
    borderRadius: 20,
    padding: width/15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalbackground: 
  {
    backgroundColor: '#9F6BFB'
  },
});