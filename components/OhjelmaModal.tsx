import React, {useState} from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, Button } from 'react-native';
import { OhjelmaModalProps } from '../types/ModalProps'; 
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { LiikeModal } from './LiikeModal';

const { width, height } = Dimensions.get("window");

export function OhjelmaModal({modalVisible, setModalVisible}: OhjelmaModalProps) {
          const [modalVisible1, setModalVisible1] = useState(false);
    
  return (
    <View> 
      <Pressable
                 
                onPress={() => setModalVisible(true)}>
         <Text style={styles.modalNappi}>Luo uusi</Text>
      </Pressable>
      
       <Modal
        animationType="slide"
        visible={modalVisible}>

          <View>
            
                <Text style={styles.otsikko}>Luo uusi treeni</Text>

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
                          db={null}                            
                            
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
   }
});