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
    const [coordList, setCoordList] = useState<Array<coordInterface>>([])
    const [timeStarted, setTimeStarted] = useState(false)

    useEffect(() => {
        (async () => {
            await Location.requestForegroundPermissionsAsync();
        })();
    }, []);

    const handleMessage = useCallback(async (event: any) => {
    
        const data = event.nativeEvent.data;

        if (data === 'request-location') {
            try {
                setTimeStarted(true)
                const position = await Location.getCurrentPositionAsync({
                });
                const coords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                coordList.push(coords)

                console.log("koordinaatit:",coordList)

                webviewRef.current?.postMessage(JSON.stringify(coords));

            } catch (e) {
                console.log('location error:', e);
            }
        }
    }, []);

    if(timeStarted) {
        setTimeout(handleMessage, 3000)
    }

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
