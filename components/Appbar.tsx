import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import { View } from 'react-native';


type Props = NativeStackHeaderProps

const sivut = [
    { label: 'Koti', value: 'Koti' },
    { label: 'Juoksu', value: 'Juoksu' },
  ];

export function CustomNavigationBar({navigation, route, options, back }: Props) {
  const title = getHeaderTitle(options, route.name);

  const [value, setValue] = useState(null);

  return (
    <View>
    <Appbar.Header>
       <Appbar.Content title={title} />
    </Appbar.Header>
    <Dropdown
          data={sivut}
          maxHeight={300}
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