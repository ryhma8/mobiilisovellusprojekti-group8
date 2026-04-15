import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, Button, TouchableOpacity, FlatList } from 'react-native';
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { LiikeModal } from './LiikeModal';
import { PäiväModalProps } from '../types/ModalProps';
import { TrainDay, Training } from '../types/database';
import { AddTrainingToDay, loadTrainData } from '../Database/Database';
import { useSQLiteContext } from 'expo-sqlite';
import TreeniCard from './TreeniCard';

const { width, height } = Dimensions.get("window");

export function PäiväModal({ modalVisiblepv, setModalVisiblepv }: PäiväModalProps) {
    const [gymTrainList, setGymTrainList] = useState<Training[]>([])
    const db = useSQLiteContext(); //ladataan database konstekstista
    const [selectedDay, setSelectedDay]= useState<number>(0)
    const [selectedTraining, setSelectedTraining]= useState<number>(0)
    const [trainForDays,setTrainForDays]= useState<TrainDay[]>([])

    useEffect(() => {
        loadTrainData(setGymTrainList, db)
    }, [])

    function addTraintoDay(){
        AddTrainingToDay(selectedDay,selectedTraining,db)
        setSelectedDay(0)
        setSelectedTraining(0)
    }

    return (
        <View>

            <TouchableOpacity style={styles.päivärivi}
                onPress={() => [setModalVisiblepv(true),setSelectedDay(1)]}>

                <Text style={styles.päivä}>Ma</Text>
                <Text style={styles.päiväbox}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
                onPress={() => [setModalVisiblepv(true),setSelectedDay(2)]}>

                <Text style={styles.päivä}>Ti</Text>
                <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
                onPress={() => [setModalVisiblepv(true),setSelectedDay(3)]}>

                <Text style={styles.päivä}>Ke</Text>
                <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
                onPress={() => [setModalVisiblepv(true),setSelectedDay(4)]}>

                <Text style={styles.päivä}>To</Text>
                <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
                onPress={() => [setModalVisiblepv(true),setSelectedDay(5)]}>

                <Text style={styles.päivä}>Pe</Text>
                <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
                onPress={() => [setModalVisiblepv(true),setSelectedDay(6)]}>

                <Text style={styles.päivä}>La</Text>
                <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
                onPress={() => [setModalVisiblepv(true),setSelectedDay(7)]}>

                <Text style={styles.päivä}>Su</Text>
                <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>


            <Modal
                animationType="slide"
                visible={modalVisiblepv}>

                <View style={styles.ohjelmaModal}>

                    <Text style={styles.otsikko}>Päivän treeni</Text>

                    <FlatList
                        data={gymTrainList}
                        keyExtractor={(item) => item.TrainDataID.toString()}
                        renderItem={({ item }) =>
                            <TreeniCard
                                item={item}
                                TrainDataID={item.TrainDataID}
                                SetTrainToDay={()=>[console.log("lisää päivälle: ",selectedDay,": treeninum: ",item.TrainDataID),
                                    setSelectedTraining(item.TrainDataID),
                                ]}
                                selected={selectedTraining === item.TrainDataID}
                            />
                        }
                        style=""
                    />
                    <View style={styles.modalNappiRivi}>
                        <Pressable

                            onPress={() => [setModalVisiblepv(false),
                                        addTraintoDay()

                            ]}>
                            <Text style={styles.modalNappi}>Tallenna</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => [setModalVisiblepv(false),
                                setSelectedDay(0),
                                setSelectedTraining(0)
                            ]}>
                            <Text style={styles.modalNappi}>Sulje</Text>
                        </Pressable>


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
        width: 90,
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
    päiväbox: {
        backgroundColor: '#f6f6f6ff',
        margin: 2,
        padding: 5,
        height: 60,
        width: 250,
        borderRadius: 4,

    },
    päivärivi: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300,

    },
    päivä: {
        fontSize: 30

    },
    ohjelmaModal: {
        backgroundColor: '#9F6BFB',
        flex: 1
    }
});