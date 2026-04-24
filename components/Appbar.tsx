import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Dropdown } from 'react-native-element-dropdown';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';


type Props = NativeStackHeaderProps
const { width, height } = Dimensions.get("window");

const sivut = [
    { label: 'Koti', value: 'Koti' },
    { label: 'Kartta', value: 'Kartta' },
    { label: 'Profliili', value: 'Profiili' },
    { label: 'Sali', value: 'Sali'},
  ];

export function CustomNavigationBar({navigation, route, options, back }: Props) 
{
  return (
    <View style={styles.container}>
      <Dropdown style={styles.navBox}
            
          data={sivut}
          maxHeight={height-height/20}
          placeholderStyle={styles.itemtext}
          selectedTextStyle={styles.itemtext}
          iconColor={'#ffffff'}
          itemTextStyle={styles.itemtext}
          itemContainerStyle={styles.list}
          labelField="label"
          valueField="value"
          placeholder={'Navigoi'}
          onChange={item => {
          navigation.navigate(item.value);
          }}
       >
       </Dropdown>
      </View>
  );
}

const styles = StyleSheet.create({
  container: 
  {
    alignContent: 'center',
    alignItems: 'center',
    gap: width/50,
    backgroundColor: '#9F6BFB',
    flexDirection: 'row'
  },
  navBox: 
  {
    width: width/3,
    height: height/20,
    marginLeft: width/30,
    marginTop: width/30,
    backgroundColor: '#9F6BFB',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ffffff'
  },
  text:
  {
    margin: 5,
    fontSize: horizontalScale(18) // stackista lainattu funktio responsiviiselle fonttikoolle
  },
  itemtext:
  {
    margin: 5,
    color: '#ffffff',
    fontSize: horizontalScale(18) // stackista lainattu funktio responsiviiselle fonttikoolle
  },
  list:
  {
    backgroundColor: '#9F6BFB',
    fontSize: horizontalScale(18),
    borderBlockColor: '#000000',
    borderWidth: 1,
    margin: 1
  }
});
