import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'

type Props = NativeStackScreenProps<RootStackParamList,'Juoksu'>


export function Juoksu({ route }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ja toka ruutu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
container: 
{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
},
text: 
{
  fontSize: 24,
  fontWeight: 'bold',
},
})