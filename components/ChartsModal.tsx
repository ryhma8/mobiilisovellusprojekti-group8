import React, {useState} from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, Button } from 'react-native';
import { KarttaModalProps } from '../types/ModalProps'; 
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { MyChart } from './chart';
import { WeightAndJogdata } from '../types/JogData';
import { UserData } from '../types/database';
import { loadUserData } from '../Database/Database';
import { useSQLiteContext } from 'expo-sqlite';

const { width, height } = Dimensions.get("window");

export function ChartsModal({ChartsVisible, setChartsVisible, DataArr, Karttamoodi}: KarttaModalProps) {

  const db = useSQLiteContext(); //ladataan database

function resetoiModal()
{
    setChartsVisible(false)
}

  return (
    <View style={styles.containerAsButton}> 
       <Modal
        animationType="slide"
        visible={ChartsVisible}>

          <View style={styles.modalView}>
                <MyChart 
                DataArr={DataArr}
                Karttamoodi={Karttamoodi}>
                
                </MyChart>           
            <View style={styles.PressableContainer}>    
                <Pressable
                style= {styles.Pressable} 
                onPress={() => resetoiModal()}>
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
    width: width/1.4
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
    marginBottom: width/5
  },
  Pressable: 
  {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: height/20,
    width: width/3,
    justifyContent: 'center',
    alignItems: 'center'
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
    marginTop: height/5,
    backgroundColor: '#9F6BFB',
    borderRadius: 20,
    padding: width/15,
    alignItems: 'center',
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