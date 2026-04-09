import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, Button } from 'react-native';
import { LuoProfiiliModalProps } from '../types/ModalProps'; 
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { AddProfile } from '../Database/Database';
import { useSQLiteContext } from 'expo-sqlite';
const { width, height } = Dimensions.get("window");


export function LuoProfiiliValikkoModal({modalVisible, setModalVisible, setInfogiven}: LuoProfiiliModalProps) {

    const db = useSQLiteContext(); //ladataan database konstekstista
    const [etuNimi, setEtunimi] = useState<string>("")
    const [sukuNimi, setsukunimi] = useState<string>("")
    const [ikä, setikä] = useState<string>("")
    const [paino, setPaino] = useState<string>("")
    const [pituus, setPituus] = useState<string>("")

async function luoProfiili()
{
    console.log("luoprofiilitest")
    if(!etuNimi && !sukuNimi && !ikä && !paino && !pituus) return
    
    try {
    
      const res = await AddProfile(etuNimi, sukuNimi, ikä, paino, pituus, db)
      setModalVisible(false) //lopus kiinni modali jos onnistuu profiilin lisääminen
      setInfogiven(true)
      console.log(res)
    } catch (error) {
      console.log("error")
      alert("Tietokantavirhe, käynnistä sovellus uudelleen")
    }
    
}

  return (
    <View style={styles.container}>
      
    <Pressable style={styles.Pressable2} onPress={() => setModalVisible(true)} >
      <Text style={styles.textBold}>Luo käyttäjäprofiili</Text>
    </Pressable>
       <Modal
        animationType="slide"
        visible={modalVisible}>

          <View style={styles.modalView}>
                <View style={styles.flex}>

                    <TextInput
                    value={etuNimi}
                    onChangeText={setEtunimi}
                    style= {styles.textinput}
                    placeholder='Etunimi:'>    
                    </TextInput>

                    <TextInput
                    value={sukuNimi}
                    onChangeText={setsukunimi}
                    style= {styles.textinput}
                    placeholder='Sukunimi:'>
                    </TextInput>

                    <TextInput
                    value={ikä}
                    onChangeText={setikä}
                    style= {styles.textinput}
                    placeholder='Ikä:'>
                    </TextInput>

                    <TextInput
                    value={paino}
                    onChangeText={setPaino}
                    style= {styles.textinput}
                    placeholder='Paino:'>    
                    </TextInput>

                    <TextInput
                    value={pituus}
                    onChangeText={setPituus}
                    style= {styles.textinput}
                    placeholder='Pituus:'>
                    </TextInput>

                <Pressable
                style= {styles.Pressable} 
                onPress={() => luoProfiili()}>
                <Text style={styles.textClose}>Luo profiili</Text>
                </Pressable>
  

            </View>
          </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  textClose: 
  {
    fontSize: horizontalScale(16),
    fontWeight: 'bold'
  },
   Pressable2: 
  {
    borderRadius: 10,
    height: height/10,
    width: width/1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: 
  {
    fontSize: horizontalScale(16)
  },
  textBold: 
  {
    fontSize: horizontalScale(20),
    color: '#9F6BFB',
    fontWeight: 'bold'
  },
  flex: 
  {
    gap: 30,
    flexDirection: 'column',
    alignItems: 'center',
  },
  textinput: 
  {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: width/1.4
  },
  container: 
  {
    backgroundColor: '#ffffff',
    borderRadius: 15
  },
  modalbackground: 
  {
    backgroundColor: '#9F6BFB'
  },
  PressableContainer: 
  {
    flex: 1,
    flexDirection: 'column',
    gap: width/10,
    marginBottom: height/20,
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
  modalView: 
  {
    backgroundColor: '#9F6BFB',
    gap: height/20,
    marginTop: height/10,
    margin: width/15,
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
});