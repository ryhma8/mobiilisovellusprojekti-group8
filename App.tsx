import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from './types/navigation';
import { CustomNavigationBar } from './components/Appbar';
import { Koti } from './screens/Koti';
import { Juoksu } from './screens/Juoksu';
import { Profiili } from './screens/Profiili';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import { Database } from './Database/Database';

export const { width, height } = Dimensions.get("window");
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  /*useEffect(() => {
    Database({db, setDb}) //laittaan päälle jossain vaiheessa
  }, []);*/


  return (  
    <NavigationContainer>
      <SafeAreaView style={styles.container}>

      <Button
            onPress={() => Database({db, setDb})}
            title="lataa db" // testibuttoni, poista myöhemmin
            color="#841584"
      ></Button>
        
        
      <StatusBar/>   
      <Stack.Navigator
        initialRouteName="Koti"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}>
          
        <Stack.Screen name="Koti" component={Koti} />
        <Stack.Screen name="Juoksu" component={Juoksu} />
        <Stack.Screen name="Profiili" component={Profiili} />
      </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#550505',
  },
});
