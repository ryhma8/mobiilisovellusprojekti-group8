import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Exercise, UserData,UserWeight } from '../types/database';
import * as SQLite from 'expo-sqlite';
import { Database } from '../Database/Database';

type gymArr = 
{
    gymExerList: Exercise[]
}

export default function LiikeCard({gymExerList}: gymArr) {

    const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
    const [userData, setUserData] = useState<UserData[]>([])
    const [UserWeight, setUserWeight] = useState<UserWeight[]>([])

    return (
        <View>
            <TouchableOpacity>

                <Text style={styles.liike}>{gymExerList[0].Repetitions}</Text>
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