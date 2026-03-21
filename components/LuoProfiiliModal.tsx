import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, Button } from 'react-native';
import { LuoProfiiliModalProps } from '../types/ModalProps'; 
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { AddProfile } from '../Database/Database';
const { width, height } = Dimensions.get("window");


export function LuoProfiiliValikkoModal({modalVisible, setModalVisible, db, setInfogiven}: LuoProfiiliModalProps) {
  
    const [etuNimi, setEtunimi] = useState<string>("")
    const [sukuNimi, setsukunimi] = useState("")
    const [ikä, setikä] = useState("")
    const [paino, setPaino] = useState("")
    const [pituus, setPituus] = useState("")

function luoProfiili()
{
    console.log("luoprofiilitest")
    if(!etuNimi && !sukuNimi && !ikä && !paino && !pituus) return
    AddProfile(etuNimi, sukuNimi, ikä, paino, pituus, db)
    setModalVisible(false) //lopus kiinni modali jos onnistuu profiilin lisääminen
    setInfogiven(true)
}

  return (
    <View style={styles.container}>
      
    <Pressable onPress={() => setModalVisible(true)} >
      <Text style={styles.text}>Luo käyttäjäprofiili</Text>
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

            </View>
                
            <View style={styles.PressableContainer}>   
                <Pressable
                style= {styles.Pressable} 
                onPress={() => luoProfiili()}>
                    <Text style={styles.textClose}>Luo profiili</Text>
                </Pressable>

                <Pressable
                style= {styles.Pressable} 
                onPress={() => setModalVisible(false)}>
                    <Text style={styles.textClose}>Sulje modal</Text>
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
  textinput: 
  {
    backgroundColor: '#fcf1f1',
    borderColor: '#a19292',
    borderWidth: 1,
    borderRadius: 10,
    width: width/3

  },
  container: 
  {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PressableContainer: 
  {
    flex: 1,
    flexDirection: 'row',
    gap: width/10,
  },
  Pressable: 
  {
    backgroundColor: '#a57d7d',
    borderRadius: 10,
    height: height/20,
    width: width/3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: 
  {
    gap: height/20,
    height: height/2.5,
    marginTop: height/10,
    margin: width/15,
    backgroundColor: 'white',
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