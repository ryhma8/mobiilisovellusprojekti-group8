import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { LiikeModal } from './LiikeModal';
import { PäiväModalProps } from '../types/ModalProps';
import { Exercise, TrainDay, Training } from '../types/database';
import { AddTrainingToDay, loadDayData, loadGymData, loadTrainData } from '../Database/Database';
import { useSQLiteContext } from 'expo-sqlite';
import TreeniCard from './TreeniCard';
import ExerciseCard from './ExerciseCard';

const { width, height } = Dimensions.get("window");

export function PäiväModal({ modalVisiblepv, setModalVisiblepv }: PäiväModalProps) {
    const [gymTrainList, setGymTrainList] = useState<Training[]>([])
    const db = useSQLiteContext(); //ladataan database konstekstista
    const [selectedDay, setSelectedDay] = useState<number>(0)
    const [selectedTraining, setSelectedTraining] = useState<number>(0)
    const [trainForDays, setTrainForDays] = useState<TrainDay[]>([])
    const [gymExerList, setGymExerList] = useState<Exercise[]>([])

    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        if (refresh) {
            setRefresh(false)
        }
        console.log("useef alussa ", trainForDays)

        // console.log("ennen tyhjennystä ", trainForDays)
        //console.log("kaikki treenit, ", gymTrainList)
        //console.log("tyhjennyksen jölkeen ", trainForDays)
        loadGymData(setGymExerList, db)

        loadTrainData(setGymTrainList, db)
        loadDayData(setTrainForDays, db)
        console.log("lopulta ", trainForDays)

    }, [refresh])

    const trainMap = Object.fromEntries(
        gymTrainList.map(train => [train.TrainDataID, train.TrainName])
    );


    function consolelogs() {
        //console.log("trainlist: ", gymTrainList)
        console.log("trainfordays: ", trainForDays)
    }


    function addTraintoDay() {
        AddTrainingToDay(selectedDay, selectedTraining, db)
        setSelectedDay(0)
        setSelectedTraining(0)
    }
    function deleteTrainDay() {
        console.log("poistettu")
        AddTrainingToDay(selectedDay, 0, db)
    }

    const selectedDayData = trainForDays.find(
        d => d.Day === selectedDay
    );
    const selectedTrainingForDay = gymTrainList.find(
        t => t.TrainDataID === selectedDayData?.TrainNumber
    );

    const exerciseMap = Object.fromEntries(
        gymExerList.map(e => [e.GymDataID, e])
    );

    const exerciseIds = selectedTrainingForDay
        ? [
            selectedTrainingForDay.Exec1,
            selectedTrainingForDay.Exec2,
            selectedTrainingForDay.Exec3,
            selectedTrainingForDay.Exec4,
            selectedTrainingForDay.Exec5,
            selectedTrainingForDay.Exec6,
            selectedTrainingForDay.Exec7,
            selectedTrainingForDay.Exec8,
            selectedTrainingForDay.Exec9,
            selectedTrainingForDay.Exec10,
        ].filter(Boolean)
        : [];


    return (
        <View>

            <TouchableOpacity style={styles.päivärivi}
                onPress={() => [setModalVisiblepv(true), setSelectedDay(1),setRefresh(true)]}>

                <Text style={styles.päivä}>Ma</Text>
                <Text style={styles.päiväbox}>
                    {trainMap[trainForDays[6]?.TrainNumber]}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
                onPress={() => [setModalVisiblepv(true), setSelectedDay(2),setRefresh(true)]}>

                <Text style={styles.päivä}>Ti</Text>
                <Text style={styles.päiväbox}>
                    {trainMap[trainForDays[5]?.TrainNumber]}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
                onPress={() => [setModalVisiblepv(true), setSelectedDay(3),setRefresh(true)]}>

                <Text style={styles.päivä}>Ke</Text>
                <Text style={styles.päiväbox}>
                    {trainMap[trainForDays[4]?.TrainNumber]}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
                onPress={() => [setModalVisiblepv(true), setSelectedDay(4),setRefresh(true)]}>

                <Text style={styles.päivä}>To</Text>
                <Text style={styles.päiväbox}>
                    {trainMap[trainForDays[3]?.TrainNumber]}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
                onPress={() => [setModalVisiblepv(true), setSelectedDay(5),setRefresh(true)]}>

                <Text style={styles.päivä}>Pe</Text>
                <Text style={styles.päiväbox}>
                    {trainMap[trainForDays[2]?.TrainNumber]}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
                onPress={() => [setModalVisiblepv(true), setSelectedDay(6),setRefresh(true)]}>

                <Text style={styles.päivä}>La</Text>
                <Text style={styles.päiväbox}>
                    {trainMap[trainForDays[1]?.TrainNumber]}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
                onPress={() => [setModalVisiblepv(true), setSelectedDay(7),setRefresh(true)]}>

                <Text style={styles.päivä}>Su</Text>
                <Text style={styles.päiväbox}>
                    {trainMap[trainForDays[0]?.TrainNumber]}
                </Text>
            </TouchableOpacity>
            

            <Modal
                animationType="slide"
                visible={modalVisiblepv}>

                <View style={styles.ohjelmaModal}>

                    <Text style={styles.otsikko}>Päivän treeni</Text>

                    <View>
                        <View>
                            {selectedTrainingForDay ? (
                                <ScrollView>
                                    <View style={styles.päivärivi}>
                                    <TreeniCard
                                        item={selectedTrainingForDay}
                                        TrainDataID={selectedTrainingForDay.TrainDataID}
                                    />
                                    <TouchableOpacity
                                        onPress={() => [deleteTrainDay(), setModalVisiblepv(false), setRefresh(true)]}
                                        style={styles.delete}
                                    >
                                        <Text>Poista</Text>
                                        
                                    </TouchableOpacity>
                                    </View>
                                    {exerciseIds.map((id, index) => {
                                        const exercise = exerciseMap[Number(id)];
                                        if (!exercise) return null;
                                        return <ExerciseCard key={index} exercise={exercise} />;
                                    })}
                                    
                                </ScrollView>
                            ) :

                                <FlatList
                                    data={gymTrainList}
                                    keyExtractor={(item) => item.TrainDataID.toString()}
                                    renderItem={({ item }) =>
                                        <TreeniCard
                                            item={item}
                                            TrainDataID={item.TrainDataID}
                                            SetTrainToDay={() => [console.log("lisää päivälle: ", selectedDay, ": treeninum: ", item.TrainDataID),
                                            console.log("treenilista: ", gymTrainList[2]),
                                            setSelectedTraining(item.TrainDataID),
                                            ]}
                                            selected={selectedTraining === item.TrainDataID}
                                        />
                                    }

                                />}

                        </View>
                    </View>

                    <View style={styles.modalNappiRivi}>
                        <Pressable

                            onPress={() => [
                                setRefresh(true),
                                setModalVisiblepv(false),
                                addTraintoDay(),

                            ]}>
                            <Text style={styles.modalNappi}>Tallenna</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => [setModalVisiblepv(false),
                            setSelectedDay(0),
                            setSelectedTraining(0),
                            setRefresh(true)

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
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        margin: 0,
        backgroundColor: '#9F6BFB'
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
        fontSize:20,
        textAlignVertical:'center'

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
        paddingBottom: 150,
        flex: 1
    },
    selectedTrainingText: {
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
        color: '#333'
    },
    delete: {
        backgroundColor: '#fc8bd2ff',
        padding: 5,
        margin: 5,
        width: 50,
        height: 40,
        borderRadius: 5,
        fontSize: 15,

    }
});