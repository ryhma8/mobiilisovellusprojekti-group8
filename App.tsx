import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from './types/navigation';
import { CustomNavigationBar } from './components/Appbar';
import { Koti } from './screens/Koti';
import { Kartta } from './screens/Kartta';
import { Profiili } from './screens/Profiili';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Database } from './Database/Database';
import * as SQLite from 'expo-sqlite';
import { UserData } from './types/database';
import { Sali } from './screens/Sali';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  //const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  //const [userData, setUserData] = useState<UserData[]>([])

  return (  
    <NavigationContainer>
      <SafeAreaView style={styles.container}>  
      <StatusBar/>   
      <Stack.Navigator
        initialRouteName="Koti"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}>
          
        <Stack.Screen name="Koti" component={Koti} />
        <Stack.Screen name="Juoksu" component={Juoksu} />
        <Stack.Screen name="Profiili" component={Profiili}  />
        <Stack.Screen name="Sali" component={Sali} />
      </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
