import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, FlatList, ScrollView } from 'react-native';
import { TreeniListaModalProps } from '../types/ModalProps';
import { Exercise, Training } from '../types/database';
import { deleteTraining, loadGymData, loadTrainData } from '../Database/Database';

import TreeniCard from './TreeniCard';
import ExerciseCard from './ExerciseCard';
import { TreeniModal } from './TreeniModal';


export function TreeniListaModal({ modalVisibleTreeniLista, setModalVisibleTreeniLista, db }: TreeniListaModalProps) {
    const [modalVisibleTreeni, setModalVisibleTreeni] = useState(false);
    const [modalTraining, setModalTraining] = useState(false);
    const [gymTrainList, setGymTrainList] = useState<Training[]>([]);
    const [gymExerList, setGymExerList] = useState<Exercise[]>([]);
    const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
    const [toBeDeleted, setToBeDeleted]= useState<number>(0)

    const exerciseMap = Object.fromEntries(
        gymExerList.map(e => [e.GymDataID, e])
    );

    useEffect(() => {

        console.log("refresh")
        loadGymData(setGymExerList, db);
        loadTrainData(setGymTrainList, db);
    }, [modalVisibleTreeni]);

    const exerciseIds = selectedTraining
        ? [
            selectedTraining.Exec1,
            selectedTraining.Exec2,
            selectedTraining.Exec3,
            selectedTraining.Exec4,
            selectedTraining.Exec5,
            selectedTraining.Exec6,
            selectedTraining.Exec7,
            selectedTraining.Exec8,
            selectedTraining.Exec9,
            selectedTraining.Exec10,
        ].filter(Boolean)
        : [];

        function deleteTrain(){
            console.log("inside call")
            deleteTraining(toBeDeleted,db)
        }
    return (
        <View>
            <Pressable onPress={() => setModalVisibleTreeniLista(true)}>
                <Text style={styles.modalNappi}>Treenit</Text>
            </Pressable>

            <Modal
                animationType="slide"
                visible={modalVisibleTreeniLista}>
                <View style={styles.ohjelmaModal}>

                    <Text style={styles.otsikko}>Treenit</Text>
                    <FlatList
                        data={gymTrainList}
                        keyExtractor={(item) => item.TrainDataID.toString()}
                        renderItem={({ item }) => (
                            <TreeniCard
                                item={item}
                                TrainDataID={item.TrainDataID}
                                OnPress={() => {
                                    setSelectedTraining(item);
                                    setModalTraining(true);
                                    setToBeDeleted(item.TrainDataID);
                                }}
                            />
                        )}
                    />

                    <Modal
                        animationType="slide"
                        visible={modalTraining}>
                        <View style={styles.ohjelmaModal}>

                            <Text style={styles.otsikko}>
                                {selectedTraining?.TrainName}

                            </Text>
                            <ScrollView>
                                {exerciseIds.map((id, index) => {
                                    const exercise = exerciseMap[Number(id)];
                                    if (!exercise) return null;

                                    return (
                                        <ExerciseCard key={index} exercise={exercise} />
                                    );
                                })}
                            </ScrollView>
                            <View style={styles.modalNappiRivi}>
                                <Pressable onPress={() => [setModalTraining(false)]}>
                                    <Text style={styles.modalNappi}>Sulje</Text>
                                </Pressable>
                                <Pressable onPress={() => [console.log("selected: ",toBeDeleted),
                                    deleteTrain(),
                                    setModalTraining(false)
                                ]}>
                                    <Text style={styles.modalNappi}>Poista </Text>
                                </Pressable>
                            </View>

                        </View>
                    </Modal>

                    <View style={styles.modalNappiRivi}>

                        <Pressable onPress={() => setModalVisibleTreeniLista(false)}>
                            <Text style={styles.modalNappi}>Sulje</Text>
                        </Pressable>


                        <TreeniModal
                            modalVisibleTreeni={modalVisibleTreeni}
                            setModalVisibleTreeni={setModalVisibleTreeni}
                            db={db}
                        />

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
    },
    exerciseText: {
        paddingLeft: 10,
        paddingBottom: 10,
        color: '#fff'
    }
});