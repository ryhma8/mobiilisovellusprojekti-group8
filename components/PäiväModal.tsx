import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, Button, TouchableOpacity } from 'react-native';
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { LiikeModal } from './LiikeModal';
import { PäiväModalProps } from '../types/ModalProps';

const { width, height } = Dimensions.get("window");

export function PäiväModal({ modalVisiblepv, setModalVisiblepv }: PäiväModalProps) {

    return (
        <View>

            <TouchableOpacity style={styles.päivärivi}
            onPress={() => setModalVisiblepv(true)}>

                <Text style={styles.päivä}>Ma</Text>
                <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
            onPress={() => setModalVisiblepv(true)}>

                <Text style={styles.päivä}>Ti</Text>
                <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
            onPress={() => setModalVisiblepv(true)}>

                <Text style={styles.päivä}>Ke</Text>
                <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
            onPress={() => setModalVisiblepv(true)}>

                <Text style={styles.päivä}>To</Text>
                <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
            onPress={() => setModalVisiblepv(true)}>

                <Text style={styles.päivä}>Pe</Text>
                <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
            onPress={() => setModalVisiblepv(true)}>

                <Text style={styles.päivä}>La</Text>
                <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}
            onPress={() => setModalVisiblepv(true)}>

                <Text style={styles.päivä}>Su</Text>
                <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>


            <Modal
                animationType="slide"
                visible={modalVisiblepv}>

                <View>

                    <Text style={styles.otsikko}>Päivän treeni</Text>

                    <View style={styles.modalNappiRivi}>
                        <Pressable

                            onPress={() => setModalVisiblepv(false)}>
                            <Text style={styles.modalNappi}>Tallenna</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => setModalVisiblepv(false)}>
                            <Text style={styles.modalNappi}>Sulje</Text>
                        </Pressable>

                        <LiikeModal
                            modalVisible1={modalVisiblepv}
                            setModalVisible1={setModalVisiblepv}
                            db={null}

                        ></LiikeModal>
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
        margin: 10,
        width: 90,
        height: 40,
        borderRadius: 5,
        fontSize: 15,
        textAlign: 'center',
        verticalAlign: 'middle'
    },
    modalNappiRivi: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        margin: 5,
    },
    modalNapit: {
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
    otsikko: {
        textAlign: 'center',
        fontSize: 25,
        padding: 10
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
});