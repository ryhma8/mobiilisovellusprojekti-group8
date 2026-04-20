import React, { useEffect, useRef, useCallback, useState } from 'react';
import { View, StyleSheet, Text, Pressable, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { leafletHtml } from '../components/leaflet';
import { leafletHtmlStat } from '../components/leaflet_statcard';
import { laskeAvgNopeus, LaskeMatkaKoordinaateista, laskeLenkinKalorit } from '../mathFunctions/functions'
import { UserData } from '../types/database';
import { loadUserData, AddNewJog } from '../Database/Database';
import { useSQLiteContext } from 'expo-sqlite';
import { WeightAndJogdata } from '../types/JogData';

interface coordInterface {
    coords: { lat: number; lng: number; };
    time: number;
}

interface coords {
    lat: number;
    lng: number;
}

export function Kartta() {

    const db = useSQLiteContext(); //ladataan database
    
    const [userData, setUserData] = useState<UserData[]>([])
    const [UserWeight, setUserWeight] = useState<WeightAndJogdata[]>([])
     const [Jogdata, setJogData] = useState<WeightAndJogdata[]>([])

    const webviewRef = useRef<WebView | null>(null);
    const statWebviewRef = useRef<WebView | null>(null);
    const trackingRef = useRef<number | null>(null);
    const [coordList, setCoordList] = useState<coordInterface[]>([]);
    const [coordsForDb, setCoordsForDb] = useState<coords[]>([])
    const [trackedJog, setTrackedJog] = useState<coordInterface[]>([]);
    const [databaseCoords, setDatabaseCoords] = useState<coords[]>([])
    const [distance, setDistance] = useState<number>(0);
    const [fromStartAvgSpd, setFromStartAvgSpd] = useState<number>(0);
    const [avgSpd, setAvgSpd] = useState<number>(0);
    const [fromStartMsToKm, setFromStartMsToKm] = useState<number>(0);
    const [msToKm, setMsToKm] = useState<number>(0);
    const [spdText, setSpdText] = useState(false);
    const [calories, setCalories] = useState<number>(0);
    const [prevCoords, setPrevCoords] = useState<coords>({lat: 0, lng: 0})

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef(0);

    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        (async () => {
            await Location.requestForegroundPermissionsAsync();
        })();
    }, []);

    useEffect(() => {
              loadUserData(db, setUserData, setUserWeight, setJogData) // useeffectilla ladataan db, eli tietokanta usetstate muuttujaan
            }, []);

    useEffect(() => {
        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10)
        }

        return () => {
            if(intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        }
    }, [isRunning]);

    useEffect(() => {
        if(coordList.length < 2 ) {
            return;
        } 

        //console.log("koordinaatit:", coordList)

        const coordLength = coordList.length;

        const c0 = coordList[coordLength - 2];
        const c1 = coordList[coordLength - 1];

        const x0 = LaskeMatkaKoordinaateista(coordList.map(c => c.coords).slice(0, -1));
        const x1 = LaskeMatkaKoordinaateista(coordList.map(c => c.coords));

        const m0 = x0 * 1000;
        const m1 = x1 * 1000;

        const t0 = c0.time / 1000;
        const t1 = c1.time / 1000;
        const minuutit = t1 / 60;

        console.log("t0: ", t0);
        console.log("t1: ", t1);
        console.log("m0: ", m0);
        console.log("m1: ", m1);
        console.log("paino", UserWeight);

        if(m1 == m0){
            
        }
        else
        {
        setAvgSpd(laskeAvgNopeus(t0, t1, m0, m1));
        setFromStartAvgSpd(laskeAvgNopeus(0, t1, 0, m1));

        setMsToKm(avgSpd * 3.6);
        setFromStartMsToKm(fromStartAvgSpd * 3.6);
        }
        

        if(UserWeight != null || UserWeight != undefined) {
            setCalories(laskeLenkinKalorit(UserWeight[0].Weight_Kg, minuutit, fromStartAvgSpd))
            console.log("kalorit: ", calories)
        }

  

        setDistance(x1);

        console.log("nopeus tällä hetkellä: ", avgSpd);
        console.log("nopeus alusta asti tähän hetkeen: ", fromStartAvgSpd);
        console.log("matka tällä hetkellä: ", distance);
        console.log("aika tällä hetkellä: ", elapsedTime / 1000);
        console.log("timelist tällä hetkellä: ", coordList.map(c => c.time / 1000));

    }, [coordList]);

    useEffect(() => {
        if(trackedJog.length < 2 ) {
            return;
        }

        console.log("viime juoksu:", trackedJog);

    }, [trackedJog]);

    const sendLocationToWebView = useCallback(async () => {
        try {
            const position = await Location.getCurrentPositionAsync({
            });

            const coords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            const currentTime = Date.now() - startTimeRef.current;

            setCoordList(prev => [...prev, 
                {
                    coords,
                    time: currentTime
                } 
            ]);

            setCoordsForDb(prev => [...prev, 
                
                coords
                 
            ]);


            webviewRef.current?.postMessage(JSON.stringify(coords));
            
            

        } catch (e) {
            console.log('location error:', e);
        }
    }, []);

    const handleMessage = useCallback(async (event: any) => {
        const data = event.nativeEvent.data;

        if (data === 'request-location') {
            await sendLocationToWebView();
        }

        if (data === 'start-tracking') {
            if (trackingRef.current) return;

            trackingRef.current = window.setInterval(() => {
                sendLocationToWebView();
            }, 1000);

            startTime();

        }

        if (data === 'stop-tracking') {
            if (trackingRef.current) {
                clearInterval(trackingRef.current);
                trackingRef.current = null;
            }

            stopTime();
            
            setTrackedJog(coordList);
            setDatabaseCoords(coordsForDb);

            setShowStats(true);

            setTimeout(() => {
                statWebviewRef.current?.postMessage(JSON.stringify({
                    type: "draw-polyline",
                    coords: coordList.map(c => c.coords)
                }));
            }, 300)

            setCoordList([]);
            setCoordsForDb([]);
        }
    }, [sendLocationToWebView, coordList]);

    function startTime() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;

    }

    function stopTime() {
        setIsRunning(false);
        setElapsedTime(0);
    }

    function formatTime(ms: number) {
        let hours = Math.floor(ms / (1000 * 60 * 60));
        let minutes = Math.floor(ms / (1000 * 60) % 60);
        let seconds = Math.floor(ms / (1000) % 60);

        const hoursString = String(hours).padStart(2, "0");
        const minutesString = String(minutes).padStart(2, "0");
        const secondsString = String(seconds).padStart(2, "0");

        return `${hoursString}:${minutesString}:${secondsString}`
    }


    return (
        <View style={styles.container}>
            <Pressable onPress={() => setSpdText(prev => !prev ) }>
                <View style={styles.numberContainer}>
                    <Text style={styles.teksti}>
                        {spdText ? `Keskinopeus (kokonais): ${fromStartMsToKm.toFixed(2)} km/h` : `Keskinopeus (nykyinen): ${msToKm.toFixed(2)} km/h`}
                    </Text>
                </View>
            </Pressable>
            <View style={styles.numberContainerBottom}>
                <Text style={styles.teksti}>Matka: {distance.toFixed(2)} km</Text>
            </View>
            <WebView
                ref={webviewRef}
                originWhitelist={['*']}
                source={{ html: leafletHtml }}
                onMessage={handleMessage}
                style={{ flex: 1 }}
            />

            <Modal
                visible={showStats}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.statcard}>
                        <Text style={styles.statcardTitle}>Juoksun tiedot</Text>

                        <View style={{ height: 200, marginBottom: 20 }}>
                            <WebView
                            ref={statWebviewRef}
                            originWhitelist={['*']}
                            source={{ html: leafletHtmlStat }}
                            onMessage={handleMessage}
                            style={{ flex: 1 }}
                            />
                        </View>

                        <Text style={styles.statCardText}>Matka: {distance.toFixed(2)} km</Text>
                        <Text style={styles.statCardText}>Keskinopeus (kokonais): {fromStartMsToKm.toFixed(2)} km/h</Text>
                        <Text style={styles.statCardText}>Aika: {formatTime(trackedJog.at(-1)?.time ?? 0)}</Text>
                        <Text style={styles.statCardText}>Kaloreita kulutettu: {calories.toFixed(0)}</Text>

                        <View style={{ flexDirection:"row", justifyContent: "space-between", width: "100%", }}>
                            <Pressable
                                onPress={() => [AddNewJog(fromStartMsToKm, calories, distance, trackedJog.at(-1)?.time ?? 0, JSON.stringify(databaseCoords) ,db), setShowStats(false)]}
                                style={styles.statcardButton}
                            >
                                <Text style={styles.statcardButtonText}>Tallenna</Text>
                            </Pressable>

                            <Pressable
                                onPress={() => setShowStats(false)}
                                style={styles.statcardButton}
                            >
                                <Text style={styles.statcardButtonText}>Sulje</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    teksti: {
        fontSize: 30
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
        borderRadius: 20,
        width: "48%",
        alignItems: "center",
        justifyContent: "center",
    },
    statCardText: {
        fontSize: 20
    },
    statcardButtonText: {
        fontSize: 30,
    }
});
