import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, Button } from 'react-native';
import { OhjelmaModalProps, TreeniModalProps } from '../types/ModalProps';
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { LiikeModal } from './LiikeModal';
import LiikeCard from './LiikeCard';
import { Exercise } from '../types/database';
import { loadGymData } from '../Database/Database';

const { width, height } = Dimensions.get("window");

export function TreeniModal({ modalVisibleTreeni, setModalVisibleTreeni, db }: TreeniModalProps) {

    const numerotest = 1



    return (
        <View>
            <Pressable

                onPress={() => setModalVisibleTreeni(true)}>
                <Text style={styles.modalNappi}>Treenit</Text>
            </Pressable>

            <Modal
                animationType="slide"
                visible={modalVisibleTreeni}>

                <View style={styles.ohjelmaModal}>

                    <Text style={styles.otsikko}>Treenit</Text>
                    <Pressable
                        onPress={() => setModalVisibleTreeni(false)}>
                        <Text style={styles.modalNappi}>Sulje</Text>
                    </Pressable>

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
    ohjelmaModal: {
        backgroundColor: '#9F6BFB',
        flex: 1
    }
});