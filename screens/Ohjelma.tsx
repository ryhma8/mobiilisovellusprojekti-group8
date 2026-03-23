import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'

type Props = NativeStackScreenProps<RootStackParamList, 'Ohjelma'>


export function Ohjelma({ route }: Props) {
  return (
    <View>
      <Text>Ohjelma</Text>
    </View>
  )
}