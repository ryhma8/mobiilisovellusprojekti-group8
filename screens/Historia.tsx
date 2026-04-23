import React, { useEffect, useRef, useCallback, useState } from 'react';
import { View, StyleSheet, Text, Pressable, Modal, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { leafletHtml } from '../components/leaflet';
import { leafletHtmlStat } from '../components/leaflet_statcard';
import { laskeAvgNopeus, LaskeMatkaKoordinaateista, laskeLenkinKalorit } from '../mathFunctions/functions'
import { UserData, UserWeight  } from '../types/database';
import { WeightAndJogdata } from '../types/JogData';
import { jogId } from '../types/JogDataId';
import { jogCoordinates } from '../types/jogCoordinates';
import { loadUserData, loadJogArr } from '../Database/Database';
import { useSQLiteContext } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';

interface coordInterface {
    lat: number 
    lng: number
}

export function Historia() {

    const db = useSQLiteContext(); //ladataan database konstekstista

    const [userData, setUserData] = useState<UserData[]>([])
    const [UserWeight, setUserWeight] = useState<WeightAndJogdata[]>([])
    const [JogData, setJogData] = useState<WeightAndJogdata[]>([])
    //const [JogArr, setJogArr] = useState<jogCoordinates>()
    const [JogDataArr, setJogDataArr] = useState<WeightAndJogdata[]>([])

    const statWebviewRef = useRef<WebView | null>(null);
    const [coordList, setCoordList] = useState<coordInterface[]>([]);

    const [showStats, setShowStats] = useState(false);
    const [selectedJog, setSelectedJog] = useState<WeightAndJogdata>();

    //const [firstJogId, setFirstJogId] = useState<jogId>()
    //const [id, setId] = useState(0);
    /*const [velocity, setVelocity] = useState(0);
    const [distance, setDistance] = useState(0);
    const [time, setTime] = useState(0);
    const[calories, setCalories] = useState(0);
    const[date, setDate] = useState("");*/
        
    useEffect(() => {
        loadUserData(db, setUserData, setUserWeight, setJogData) //(uus versio) useeffectilla ladataan db:stä tiedot mitä halutaan
        loadJogArr(db, setJogDataArr)

        console.log("coords historia sivulla: ", JogDataArr)
    }, []);

    useEffect(() => {
         console.log("data historiassa: ", JogDataArr)
    }, [JogDataArr]);

    const handleMessage = useCallback(async (event: any) => {
        const data = event.nativeEvent.data;

        console.log("handlemessage lähetetty");
        console.log("event data: ", data);    
    }, []);

    
    const openModal = (jog:WeightAndJogdata) => {
        setSelectedJog(jog);
        setShowStats(true);
    };

    const sendPolyline = () => {
        if (!selectedJog) return;

        statWebviewRef.current?.postMessage(JSON.stringify({
            type: "draw-polyline",
            coords: JSON.parse(selectedJog.Jog_Coordinates)
        }));

        //console.log("Polyline lähetetty");
    };


    function formatTime(ms: number) {
        let hours = Math.floor(ms / (1000 * 60 * 60));
        let minutes = Math.floor(ms / (1000 * 60) % 60);
        let seconds = Math.floor(ms / (1000) % 60);

        const hoursString = String(hours).padStart(2, "0");
        const minutesString = String(minutes).padStart(2, "0");
        const secondsString = String(seconds).padStart(2, "0");

        return `${hoursString}:${minutesString}:${secondsString}`
    }

    const deleteJog = async (jogId: number) => {
        if (!db) return;

        try {
            await db.runAsync("DELETE FROM JogData WHERE JogDataID = ?", jogId);

            await loadJogArr(db, setJogDataArr);

            setShowStats(false);

        } catch (error) {
            console.log("Virhe lenkkiä poistettaessa:", error);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.historyContainer}>
           
                <FlatList
                    data={JogDataArr}
                    keyExtractor={item => item.JogDataID.toString()}
                    renderItem={({ item }) => (
                        <Pressable style={styles.row} onPress={() => [openModal(item), handleMessage]}>
                            <Text style={styles.rowText}>
                            {item.Jog_Date}
                            </Text>
                            <Text style={styles.rowText}>{item.length_Km.toFixed(2)} km</Text>
                        </Pressable>
                    )}
                />
                
                <Modal 
                    visible={showStats}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.statcard}>
                            {selectedJog && (
                                <View>
                                    <View style={{ height: 200, marginBottom: 20 }}>
                                        <WebView
                                            ref={statWebviewRef}
                                            originWhitelist={['*']}
                                            source={{ html: leafletHtmlStat }}
                                            onMessage={handleMessage}
                                            style={{ flex: 1 }}
                                            onLoadEnd={() => {
                                                sendPolyline();
                                            }}
                                            />
                                    </View>
                                <Text style={styles.title}>Lenkki</Text>
                                <Text style={styles.statCardText}>Päivä: {selectedJog.Jog_Date}</Text>
                                <Text style={styles.statCardText}>Matka: {selectedJog.length_Km.toFixed(2)} km</Text>
                                <Text style={styles.statCardText}>Aika: {formatTime(selectedJog.Time_Minutes * 60 * 1000)}</Text>
                                <Text style={styles.statCardText}>Keskinopeus: {selectedJog.Avg_Speed.toFixed(2)} km/h</Text>
                                <Text style={styles.statCardText}>Kalorit: {selectedJog.Calories_Burned.toFixed(0)}</Text>

                                <View style={{ flexDirection:"row", justifyContent: "space-between", width: "100%", }}>
                                    <Pressable
                                        onPress={() => deleteJog(selectedJog.JogDataID)}
                                        style={styles.statcardButton}
                                    >
                                        <Text style={styles.statcardButtonText}>Poista lenkki</Text>
                                    </Pressable>
                                
                                    <Pressable
                                        onPress={() => setShowStats(false)}
                                        style={styles.statcardButton}
                                    >
                                        <Text style={styles.statcardButtonText}>Sulje</Text>
                                    </Pressable>
                                </View>

                                </View>
                            )}
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9F6BFB',
    },
    numberContainer: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        backgroundColor: '#fff',
    },
    numberContainerBottom: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        backgroundColor: '#fff',
    },
    historyContainer: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#9F6BFB',
    },
    teksti: {
        fontSize: 30
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold', 
        marginBottom: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statcard: {
        width: '90%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        elevation: 5,
    },
    statcardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statcardButton: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 2,
        borderRadius: 5,
        height: 40,
        width: "48%",
        alignItems: "center",
        justifyContent: "center",
    },
    statCardText: {
        fontSize: 20
    },
    statcardButtonText: {
        fontSize: 20,
    },
    row: {
        padding: 15,
        backgroundColor: '#eee',
        marginBottom: 10,
        borderRadius: 10,
    },
    rowText: { 
        fontSize: 16 
    },
});
