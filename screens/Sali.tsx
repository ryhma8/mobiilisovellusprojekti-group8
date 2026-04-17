import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { PäiväModal } from '../components/PäiväModal'
import { loadUserData, purgeDb } from '../Database/Database'
import * as SQLite from 'expo-sqlite';
import { UserData } from '../types/database';
import { TreeniListaModal } from '../components/TreeniListaModal'
import { LiikeListaModal } from '../components/LiikeListaModal'
import { useSQLiteContext } from 'expo-sqlite'
import { WeightAndJogdata } from '../types/JogData'



type Props = NativeStackScreenProps<RootStackParamList, 'Sali'>


export function Sali({ route }: Props) {
    
    const db = useSQLiteContext(); //ladataan database konstekstista
    
    useEffect(() => {
        loadUserData(db, setUserData, setUserWeight,setJogData) //(uus versio) useeffectilla ladataan db:stä tiedot mitä halutaan
        //purgeDb(db)
    }, []);
    const [modalVisibleLiikeLista, setModalVisibleLiikeLista] = useState(false);
    const [modalVisiblepv, setModalVisiblepv] = useState(false);
    const [modalVisibleTreeniLista, setModalVisibleTreeniLista] = useState(false);

    //const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
    const [userData, setUserData] = useState<UserData[]>([])
    const [UserWeight, setUserWeight] = useState<WeightAndJogdata[]>([])
    const [Jogdata, setJogData] = useState<WeightAndJogdata[]>([])
    



    return (
        <View style={styles.kontti}>
            <PäiväModal
                modalVisiblepv={modalVisiblepv}
                setModalVisiblepv={setModalVisiblepv}
                db={db}
            >
            </PäiväModal>
            <View style={styles.modalNappiRivi}>
            <LiikeListaModal
                modalVisibleLiikeLista={modalVisibleLiikeLista}
                setModalVisibleLiikeLista={setModalVisibleLiikeLista}
                db={db}
            ></LiikeListaModal>

            <TreeniListaModal
                modalVisibleTreeniLista={modalVisibleTreeniLista}
                setModalVisibleTreeniLista={setModalVisibleTreeniLista}
                db={db}
            ></TreeniListaModal>
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