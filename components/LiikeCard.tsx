import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Exercise, UserData,UserWeight } from '../types/database';
import * as SQLite from 'expo-sqlite';
import { Database } from '../Database/Database';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

type gymArr = 
{
    gymExerList: Exercise[]
}

interface LiikeProps{
    item: Exercise,
}


export default function LiikeCard({item}: LiikeProps) {

    const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
    const [userData, setUserData] = useState<UserData[]>([])
    const [UserWeight, setUserWeight] = useState<UserWeight[]>([])

    return (
        <View>
            <TouchableOpacity>

                <Text style={styles.liike}>{item.Exercise_Type}</Text>
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