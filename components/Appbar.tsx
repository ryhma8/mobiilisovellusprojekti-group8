import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Dropdown } from 'react-native-element-dropdown';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { horizontalScale } from '../mathFunctions/functions';


type Props = NativeStackHeaderProps
const { width, height } = Dimensions.get("window");

const sivut = [
    { label: 'Koti', value: 'Koti' },
    { label: 'Kartta', value: 'Kartta' },
    { label: 'Profliili', value: 'Profiili' },
  ];

export function CustomNavigationBar({navigation, route, options, back }: Props) 
{
  const title = getHeaderTitle(options, route.name);
  return (
    <View style={styles.container}>
      <Dropdown style={styles.navBox}
            
          data={sivut}
          maxHeight={height-height/20}
          placeholderStyle={styles.text}
          iconColor={'#000000'}
          itemContainerStyle={styles.list}
          labelField="label"
          valueField="value"
          placeholder={'Navigoi'}
          onChange={item => {
          navigation.navigate(item.value);
          }}
       >
       </Dropdown>
        <Text>testipalikka1</Text>
        <Text>testipalikka2</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: 
  {
    alignContent: 'center',
    alignItems: 'center',
    gap: width/50,
    margin: width/50,
    flexDirection: 'row'
  },
  navBox: 
  {
    margin: 1,
    width: width/4,
    height: height/25,
    backgroundColor: '#8f7d7d',
    borderRadius: 15
  },
  text:
  {
    margin: 5,
    fontSize: horizontalScale(16) // stackista lainattu funktio responsiviiselle fonttikoolle
  },
  list:
  {
    backgroundColor: '#8f7d7d',
    fontSize: 20
  }
});
