import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from './types/navigation';
import { CustomNavigationBar } from './components/Appbar';
import { Koti } from './screens/Koti';
import { Kartta } from './screens/Kartta';
import { Historia } from './screens/Historia';
import { Profiili } from './screens/Profiili';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sali } from './screens/Sali';
import { SQLiteProvider } from 'expo-sqlite';
import { InitDatabase } from './Database/Database';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <SQLiteProvider
      databaseName="JogAppDb5dev.db"
      onInit={InitDatabase}
    >
    <NavigationContainer>
      <SafeAreaView style={styles.container}>  
      <StatusBar/>   
      <Stack.Navigator
        initialRouteName="Koti"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}>
          
        <Stack.Screen name="Koti" component={Koti} />
        <Stack.Screen name="Kartta" component={Kartta} />
        <Stack.Screen name="Profiili" component={Profiili}  />
        <Stack.Screen name="Sali" component={Sali} />
        <Stack.Screen name="Historia" component={Historia} />
      </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
