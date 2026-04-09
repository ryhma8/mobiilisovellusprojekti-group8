import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TreeniModalProps } from '../types/ModalProps'
import { Modal } from 'react-native';
import { Exercise } from '../types/database';
import LiikeCard from './LiikeCard';
import { loadGymData } from '../Database/Database';

export function TreeniModal({ modalVisibleTreeni, setModalVisibleTreeni, db }: TreeniModalProps) {

    const [gymExerList, setgymExerList] = useState<Exercise[]>([])
    const [trainName, setTrainName] = useState('')
    const [select, setSelect] = useState<string[]>([])

    useEffect(() => {
        loadGymData(setgymExerList, db)
    }, [])

    return (
        <View>
            <Pressable

                onPress={() => setModalVisibleTreeni(true)}>
                <Text style={styles.modalNappi}>Luo treeni</Text>
            </Pressable>

            <Modal
                animationType="slide"
                visible={modalVisibleTreeni}>

                <View style={styles.ohjelmaModal}>

                    <Text style={styles.otsikko}>Kaikki liikkeet</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTrainName}
                        value={trainName}
                        placeholder="Treenin nimi"
                    />
                    <FlatList
                        data={gymExerList}
                        keyExtractor={(item) => item.GymDataID.toString()}
                        renderItem={({ item }) =>
                            <LiikeCard
                                item={item}
                                GymDataID={item.GymDataID}
                                toggleSelect={(id) => {
                                    setSelect((prevSelect) => {
                                        if (prevSelect.includes(id)) {
                                            return prevSelect.filter((item) => item !== id);
                                        } else {
                                            return [...prevSelect, id];
                                        }
                                    }
                                    )
                                }}
                                selected={select.includes(item.GymDataID)}

                            />}
                        style=""
                    />
                    <Text>{select}</Text>
                    <View style={styles.modalNappiRivi}>

                        <Pressable
                            onPress={() => { setSelect([]); setModalVisibleTreeni(false) }}>
                            <Text style={styles.modalNapit}>Sulje</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => { setSelect([]); setModalVisibleTreeni(false) }}>
                            <Text style={styles.modalNapit}>Tallenna</Text>
                        </Pressable>


                    </View>

                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    modalNappi: {
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
    modalNappiRivi: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 10,
    },
    modalNapit: {
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

    ohjelmaModal: {
        backgroundColor: '#9F6BFB',
        flex: 1
    },
    otsikko: {
        textAlign: 'center',
        fontSize: 25,
        padding: 10
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '60%'
    },

});
