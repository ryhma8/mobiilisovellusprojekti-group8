import React, {useEffect, useState} from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, Button } from 'react-native';
import { OhjelmaModalProps } from '../types/ModalProps'; 
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { LiikeModal } from './LiikeModal';
import LiikeCard from './LiikeCard';
import { Exercise } from '../types/database';
import { loadGymData } from '../Database/Database';

const { width, height } = Dimensions.get("window");

export function OhjelmaModal({modalVisible, setModalVisible, db}: OhjelmaModalProps) {

const [modalVisible1, setModalVisible1] = useState(false);
const [gymExerList, setgymExerList] = useState<Exercise[]>([])
const numerotest = 1

useEffect(() => {
  loadGymData(setgymExerList)
},[])
    
  return (
    <View> 
      <Pressable
                 
                onPress={() => setModalVisible(true)}>
         <Text style={styles.modalNappi}>Luo uusi</Text>
      </Pressable>
      
       <Modal
        animationType="slide"
        visible={modalVisible}>

          <View style={styles.ohjelmaModal}>
            
                <Text style={styles.otsikko}>Luo uusi treeni</Text>
                
                <LiikeCard gymExerList={gymExerList}/>

            <View style={styles.modalNappiRivi}>   
                <Pressable
                
                onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalNapit}>Tallenna</Text>
                </Pressable>

                <Pressable
                onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalNapit}>Sulje</Text>
                </Pressable>     

                <LiikeModal
                          modalVisible1={modalVisible1}
                          setModalVisible1={setModalVisible1}
                          db={db}                            
                            
                ></LiikeModal>
            </View>

          </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    modalNappi:{
        backgroundColor:'#fc8bd2ff',
        padding: 5,
        margin: 10,
        width: 100,
        height:40,
        borderRadius:5,
        fontSize:15,
        textAlign:'center',
        verticalAlign:'middle'
    },
    modalNappiRivi:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        margin:5,
    },
   modalNapit:{
        backgroundColor:'#fc8bd2ff',
        padding: 5,
        margin: 5,
        width: 100,
        height:40,
        borderRadius:5,
        fontSize:15,
        textAlign:'center',
        verticalAlign:'middle'
   },
   otsikko:{
    textAlign:'center',
    fontSize:25,
    padding:10
   },
   ohjelmaModal:{
    backgroundColor: '#9F6BFB',
    flex:1
   }
});