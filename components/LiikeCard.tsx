import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Exercise, UserData, UserWeight } from '../types/database';
//import { Database } from '../Database/Database';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { useSQLiteContext } from 'expo-sqlite';

type gymArr =
    {
        gymExerList: Exercise[]
    }

interface LiikeProps {
    item: Exercise,
    GymDataID: number;
    toggleSelect?: (id: string) => void;
    selected?: boolean;

}



export default function LiikeCard({ item, GymDataID, toggleSelect, selected }: LiikeProps) {


    const db = useSQLiteContext(); //ladataan database konstekstista

    const [userData, setUserData] = useState<UserData[]>([])
    const [UserWeight, setUserWeight] = useState<UserWeight[]>([])
    const [selectedExec, setSelectedExec] = useState('')



    return (
        <View>
            <TouchableOpacity
                onPress={() =>  toggleSelect?.(item.GymDataID) }
                style={[
                    styles.liike,
                    selected && styles.selectedLiike]}
            >
                <Text style={styles.liikeText}> exec {item.Exercise_Type}, rest {item.Rest_Time_Minutes}, id {GymDataID}</Text>
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