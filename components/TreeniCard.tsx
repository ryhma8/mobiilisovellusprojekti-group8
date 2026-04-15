import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Exercise, Training, UserData, UserWeight } from '../types/database';
//import { Database } from '../Database/Database';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { useSQLiteContext } from 'expo-sqlite';


interface TreeniProps {
    item: Training,
    TrainDataID: number;
    SetTrainToDay?: (id: string) => void;
    toggleSelect?: (id: string) => void;
    selected?: boolean;
}



export default function TreeniCard({ item, TrainDataID, SetTrainToDay, toggleSelect, selected }: TreeniProps) {


    const db = useSQLiteContext(); //ladataan database konstekstista

    const [userData, setUserData] = useState<UserData[]>([])
    const [UserWeight, setUserWeight] = useState<UserWeight[]>([])
    const [selectedExec, setSelectedExec] = useState('')



    return (
        <View>
            <TouchableOpacity
                onPress={() => SetTrainToDay?.(item.TrainDataID)}
                style={[
                    styles.liike,
                    selected && styles.selectedLiike]}
            >
                <Text style={styles.liikeText}> name {item.TrainName},id: {item.TrainDataID}, ex1 {item.Exer1}, ex2 {item.Exer2}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({

    liike: {
        backgroundColor: '#f6f6f6ff',
        margin: 10,
        padding: 5,
        height: 60,
        width: 250,
        borderRadius: 4,
    },
    selectedLiike: {
        backgroundColor: '#fc8bd2ff',
    },
    liikeText: {
        color: '#000',
    },
});