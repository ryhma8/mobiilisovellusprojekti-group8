import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from './types/navigation';
import { CustomNavigationBar } from './components/Appbar';
import { Koti } from './screens/Koti';
import { Juoksu } from './screens/Juoksu';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
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
