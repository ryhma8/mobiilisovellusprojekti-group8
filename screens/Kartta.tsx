import React, { useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { leafletHtml } from '../components/leaflet';

export function Kartta() {
    const webviewRef = useRef<WebView | null>(null);

    useEffect(() => {
        (async () => {
            await Location.requestForegroundPermissionsAsync();
        })();
    }, []);

    const handleMessage = useCallback(async (event: any) => {
    
        const data = event.nativeEvent.data;

        if (data === 'request-location') {
            try {
                const position = await Location.getCurrentPositionAsync({});
                const coords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                webviewRef.current?.postMessage(JSON.stringify(coords));

            } catch (e) {
                console.log('location error:', e);
            }
        }
    }, []);

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
