import React, { useEffect, useRef, useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { leafletHtml } from '../components/leaflet';

interface coordInterface {
    lat: number;
    lng: number;
}

export function Kartta() {
    const webviewRef = useRef<WebView | null>(null);
    const trackingRef = useRef<NodeJS.Timeout | null>(null);
    const [coordList, setCoordList] = useState<Array<coordInterface>>([])
    const [trackedJog, setTrackedJog] = useState<Array<coordInterface>>([])

    useEffect(() => {
        (async () => {
            await Location.requestForegroundPermissionsAsync();
        })();
    }, []);

    useEffect(() => {
        if(coordList.length > 0 ) {
            console.log("koordinaatit:", coordList);
        } 
    }, [coordList]);

    useEffect(() => {
        if(trackedJog.length > 0 ) {
            console.log("viime juoksu:", trackedJog);
        }
    }, [trackedJog]);

    const sendLocationToWebView = useCallback(async () => {
        try {
            const position = await Location.getCurrentPositionAsync({
            });
            const coords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            

            setCoordList(prev => [...prev, coords]);

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

            trackingRef.current = setInterval(() => {
                sendLocationToWebView();
            }, 3000);
        }

        if (data === 'stop-tracking') {
              console.log("STOPPING — coordList at stop:", coordList);
            if (trackingRef.current) {
                clearInterval(trackingRef.current);
                trackingRef.current = null;
            }
            setTrackedJog(coordList);
            setCoordList([]);
        }
    }, [sendLocationToWebView, coordList]);

    return (
        <View style={styles.container}>
            <WebView
                ref={webviewRef}
                originWhitelist={['*']}
                source={{ html: leafletHtml }}
                onMessage={handleMessage}
                style={{ flex: 1 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
