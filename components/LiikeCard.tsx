import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Exercise, UserData,UserWeight } from '../types/database';
//import { Database } from '../Database/Database';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { useSQLiteContext } from 'expo-sqlite';

type gymArr = 
{
    gymExerList: Exercise[]
}

interface LiikeProps{
    item: Exercise,
    GymDataID: number;

}



export default function LiikeCard({item, GymDataID}: LiikeProps) {

    
    const db = useSQLiteContext(); //ladataan database konstekstista
    
    const [userData, setUserData] = useState<UserData[]>([])
    const [UserWeight, setUserWeight] = useState<UserWeight[]>([])
    const [selectedExec, setSelectedExec] = useState('')

   

    return (
        <View>
            <TouchableOpacity
            onPress={() => setSelectedExec(item.GymDataID)}
            >
                <Text style={styles.liike}>{item.GymDataID}  {item.Rest_Time_Minutes} {selectedExec} {GymDataID}</Text>
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

    }

});