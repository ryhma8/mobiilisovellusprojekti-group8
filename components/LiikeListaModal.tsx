import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, Button, FlatList } from 'react-native';
import { LiikeListaModalProps } from '../types/ModalProps';
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { LiikeModal } from './LiikeModal';
import { Exercise } from '../types/database';
import { loadGymData } from '../Database/Database';
import ExerciseCard from './ExerciseCard';

const { width, height } = Dimensions.get("window");

export function LiikeListaModal({ modalVisibleLiikeLista, setModalVisibleLiikeLista, db }: LiikeListaModalProps) {

  const [modalVisibleLiike, setModalVisibleLiike] = useState(false);
  const [gymExerList, setgymExerList] = useState<Exercise[]>([])
  const [refresh, setRefresh] = useState(false)
  
  const numerotest = 1

  useEffect(() => {
    if(refresh){
            setRefresh(false)
        }
    loadGymData(setgymExerList, db) 
  }, [refresh,modalVisibleLiike])

  return (
    <View>
      <Pressable

        onPress={() => setModalVisibleLiikeLista(true)}>
        <Text style={styles.modalNappi}>Liikkeet</Text>
      </Pressable>

      <Modal
        animationType="slide"
        visible={modalVisibleLiikeLista}>

        <View style={styles.ohjelmaModal}>

          <Text style={styles.otsikko}>Kaikki liikkeet</Text>

          <FlatList
            data={gymExerList}
            keyExtractor={(item) => item.GymDataID.toString()}
            renderItem={({ item }) =>
            <ExerciseCard 
            exercise={item}
           />
}
            style=""
          />

          <View style={styles.modalNappiRivi}>
            
            <Pressable
              onPress={() => setModalVisibleLiikeLista(false)}>
              <Text style={styles.modalNapit}>Sulje</Text>
            </Pressable>

            <LiikeModal
              modalVisibleLiike={modalVisibleLiike}
              setModalVisibleLiike={setModalVisibleLiike}
              db={db}

            ></LiikeModal>
          </View>

        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalNappi: {
    backgroundColor: '#fc8bd2ff',
    padding: 5,
    margin: 10,
    width: 100,
    height: 40,
    borderRadius: 5,
    fontSize: 15,
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  modalNappiRivi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    margin: 5,
  },
  modalNapit: {
    backgroundColor: '#fc8bd2ff',
    padding: 5,
    margin: 5,
    width: 100,
    height: 40,
    borderRadius: 5,
    fontSize: 15,
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  otsikko: {
    textAlign: 'center',
    fontSize: 25,
    padding: 10
  },
  ohjelmaModal: {
    backgroundColor: '#9F6BFB',
    flex: 1
  }
});