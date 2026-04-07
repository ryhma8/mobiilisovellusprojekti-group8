import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TreeniModalProps } from '../types/ModalProps'
import { Modal } from 'react-native';

export function TreeniModal({ modalVisibleTreeni, setModalVisibleTreeni, db }: TreeniModalProps) {
    return (
        <View>
            <Pressable

                onPress={() => setModalVisibleTreeni(true)}>
                <Text style={styles.modalNappi}>Luo treeni</Text>
            </Pressable>

            <Modal
                animationType="slide"
                visible={modalVisibleTreeni}>
                <View style={styles.ohjelmaModal}>
                    <View style={styles.modalNappiRivi}>
                        <Pressable
                            onPress={() => setModalVisibleTreeni(false)}>
                            <Text style={styles.modalNapit}>Sulje</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
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

    ohjelmaModal: {
        backgroundColor: '#9F6BFB',
        flex: 1
    }

});
