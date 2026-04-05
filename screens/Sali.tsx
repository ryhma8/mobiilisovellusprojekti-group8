import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { OhjelmaModal } from '../components/OhjelmaModal'
import { PäiväModal } from '../components/PäiväModal'
import { Database } from '../Database/Database'
import * as SQLite from 'expo-sqlite';
import { UserData, UserWeight } from '../types/database';
import { TreeniModal } from '../components/TreeniModal'



type Props = NativeStackScreenProps<RootStackParamList, 'Sali'>


export function Sali({ route }: Props) {
    useEffect(() => {
        Database({ db, setDb, setUserData, setUserWeight }) // useeffectilla ladataan db, eli tietokanta usetstate muuttujaan
        //purgeDb(db)
    }, []);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisiblepv, setModalVisiblepv] = useState(false);
    const [modalVisibleTreeni, setModalVisibleTreeni] = useState(false);

    const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
    const [userData, setUserData] = useState<UserData[]>([])
    const [UserWeight, setUserWeight] = useState<UserWeight[]>([])
    



    return (
        <View style={styles.kontti}>
            <PäiväModal
                modalVisiblepv={modalVisiblepv}
                setModalVisiblepv={setModalVisiblepv}
                db={db}
            >
            </PäiväModal>
            <View style={styles.modalNappiRivi}>
            <OhjelmaModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                db={db}
            ></OhjelmaModal>

            <TreeniModal
                modalVisibleTreeni={modalVisibleTreeni}
                setModalVisibleTreeni={setModalVisibleTreeni}
                db={db}
            ></TreeniModal>
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    kontti: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9F6BFB',

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
    uusiTreeni: {
        backgroundColor: '#0c0c0c22',
        width: 130,
        margin: 15,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalNappiRivi:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5,
        margin:5,
    },
})