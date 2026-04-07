import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, Button } from 'react-native';
import { LiikeModalProps } from '../types/ModalProps';
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { AddExercise } from '../Database/Database';

const { width, height } = Dimensions.get("window");

export function LiikeModal({ modalVisibleLiike, setModalVisibleLiike, db }: LiikeModalProps) {
    const [liike, setLiike] = useState('')
    const [paino, setPaino] = useState('')
    const [toisto, setToisto] = useState('')
    const [sarja, setSarja] = useState('')
    const [lepo, setLepo] = useState('')
    
    function addMove() {
        AddExercise(lepo,toisto,paino,liike,sarja,db)
        setModalVisibleLiike(false)
    }


    return (
        <View>
            <Pressable

                onPress={() => setModalVisibleLiike(true)}>
                <Text style={styles.modalNappi}>Luo uusi liike</Text>
            </Pressable>

            <Modal
                animationType="slide"
                visible={modalVisibleLiike}>

                <View>
                    <Text style={styles.otsikko}>Lisää liike, painot, toistot, lepo yms</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.otsikko2}>Liike</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setLiike}
                            value={liike}
                            placeholder="Liike"
                        />
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.otsikko2}>Paino</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={setPaino}
                            value={paino}
                            placeholder="Paino"
                            keyboardType='numeric'

                        />
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.otsikko2}>Toistot</Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={setToisto}
                            value={toisto}
                            placeholder="Toistojen määrä"
                            keyboardType='numeric'

                        />
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.otsikko2}>Sarjat</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setSarja}
                            value={sarja}
                            placeholder="Sarjat"
                        />
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.otsikko2}>Lepo</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setLepo}
                            value={lepo}
                            placeholder="Lepo"
                        />
                    </View>

                    <View style={styles.modalNappiRivi}>
                        <Pressable

                            onPress={addMove}>
                            <Text style={styles.modalNapit}>Tallenna</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => setModalVisibleLiike(false)}>
                            <Text style={styles.modalNapit}>Sulje</Text>
                        </Pressable>
                    </View>

                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalNappi: {
        backgroundColor: '#fc8bd2ff',
        padding: 5,
        margin: 5,
        width: 100,
        height: 40,
        borderRadius: 5,
        fontSize: 15,
        textAlign: 'center',
        verticalAlign: 'middle'
    },
    modalNappiRivi: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 10,
    },
    modalNapit: {
        backgroundColor: '#fc8bd2ff',
        padding: 5,
        margin: 10,
        width: 100,
        height: 40,
        borderRadius: 5,
        fontSize: 15,
        textAlign: 'center',
        verticalAlign: 'middle'
    },
    otsikko: {
        backgroundColor: '#a2a2a2ff',
        textAlign: 'center',
        fontSize: 20,
        padding: 10,

    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '60%'
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    otsikko2: {
        fontSize: 20,
        verticalAlign: 'middle',
        margin: 10
    }

});