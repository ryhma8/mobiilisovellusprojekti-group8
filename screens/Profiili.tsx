import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import { width, height } from '../App';
import { MyChart } from '../components/chart';


type Props = NativeStackScreenProps<RootStackParamList,'Profiili'>


export function Profiili({ route }: Props) {

  return (
    <View style={styles.container}>
          <MyChart></MyChart>
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
chart: {
    flex: 1
  },
})