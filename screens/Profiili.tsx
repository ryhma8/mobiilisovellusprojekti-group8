import React, { use, useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, Dimensions, Pressable, Image} from 'react-native';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import { ProfiiliValikkoModal } from '../components/ProfiiliModal';
import { loadNewestWeight, loadUserData, purgeDb } from '../Database/Database';
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { UserData, UserWeight } from '../types/database';
import { ChartsModal } from '../components/ChartsModal';
import { useSQLiteContext } from 'expo-sqlite';
import { WeightAndJogdata } from '../types/JogData';
import { Karttamoodi } from '../types/karttamoodiEnum';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get("window");


type Props = NativeStackScreenProps<RootStackParamList,'Profiili'>



const sivut = [
    { label: 'lenkit 7vrk', value: 'lenkit 7vrk' },
    { label: 'Paino', value: 'Paino' },
    { label: 'Profliili', value: 'Profiili' },
  ];



export function Profiili({ route }: Props) {

  const db = useSQLiteContext(); //ladataan database konstekstista
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


   useEffect(() => {
          loadUserData(db, setUserData, setUserWeight, setJogData) //(uus versio) useeffectilla ladataan db:stä tiedot mitä halutaan
          loadNewestWeight(db, setNewestWeight)
          //purgeDb(db)
        }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [ChartsVisibleWeight, setChartsVisibleWeight] = useState(false);
  const [ChartsVisibleJog, setChartsVisibleJog] = useState(false);
  const [userData, setUserData] = useState<UserData[]>([])
  const [Weightdata, setUserWeight] = useState<WeightAndJogdata[]>([])
  const [NewestWeight, setNewestWeight] = useState<WeightAndJogdata[]>([])
  const [Jogdata, setJogData] = useState<WeightAndJogdata[]>([])
  const [karttaMoodi, setKarttamoodi] = useState<Karttamoodi>(Karttamoodi.paino)
  const [Infogiven, setInfogiven] = useState(false) //refreshiä varten, tällä checkillä saadaan sivu latautumaan uudelleen tietojen asettamisen jälkeen
  
     if(Infogiven)
        {
          loadUserData(db, setUserData, setUserWeight, setJogData)
          loadNewestWeight(db, setNewestWeight)
          setInfogiven(false)
        }
  

  function asetaPainoChartiin()
  {
    setKarttamoodi(Karttamoodi.paino)
    console.log(karttaMoodi)
    console.log("käyttäjä paino " +JSON.stringify(Weightdata))
    setChartsVisibleWeight(true)
  }
  function asetaLenkitPituusChartiin()
  {
    setKarttamoodi(Karttamoodi.pituusAvg)
    console.log(karttaMoodi)
    setChartsVisibleJog(true)
  }
   function asetaKaloritChartiin()
  {
    setKarttamoodi(Karttamoodi.lenkkiCal)
    console.log(karttaMoodi)
    setChartsVisibleJog(true)
  }
  function asetaLenkkiAikaChartiin()
  {
    setKarttamoodi(Karttamoodi.lenkkiAika)
    console.log(karttaMoodi)
    setChartsVisibleJog(true)
  }


if (userData.length > 0) return (
      
      <View style={styles.container}>

      <View style={styles.textarea}>

        <Image
         source={require('../assets/person-svgrepo-com.png')}
        style={styles.image}>
        </Image>
        
                          <View style={styles.flexMaster}>
                          
                          <View style={styles.flexSingle}>
                              <View style={styles.textRow}>
                                <Text  style= {styles.text}> Nimi: </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.text}> Sukunimi: </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.text}> Pituus: </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.text}> Ikä: </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.text}> Paino: </Text>
                              </View>
                          </View>

                          <View style={styles.flexSingle}>
                              <View style={styles.textRow}>
                                <Text  style= {styles.textName}> {userData[0]?.FirstName} </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.textName}> {userData[0]?.LastName} </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.textName}> {userData[0]?.Height_Cm} cm </Text>
                              </View>

                              <View style={styles.textRow}>
                                <Text  style= {styles.textName}> {userData[0]?.Age} vuotta </Text>
                              </View>

                              <View style={styles.textRow}>                    
                                <Text  style= {styles.textName}> {NewestWeight[0]?.Weight_Kg} kg </Text>
                              </View>
                       
                          </View>  
                       
                      </View>

      <ProfiiliValikkoModal
          modalVisible= {modalVisible}
          setModalVisible={setModalVisible}
          db={db}
          setInfogiven = {setInfogiven}
      ></ProfiiliValikkoModal> 

      <View style={styles.PressableContainer}>
        <Pressable
         style= {styles.Pressable} 
          onPress={() => asetaKaloritChartiin()}>
          <Text style={styles.textClose}>poltetut kalorit</Text>
        </Pressable>

        <Pressable
         style= {styles.Pressable} 
          onPress={() => asetaPainoChartiin()}>
          <Text style={styles.textClose}>Paino</Text>
        </Pressable> 

      </View>
      <View style={styles.PressableContainer}>
        <Pressable
         style= {styles.Pressable} 
          onPress={() => asetaLenkitPituusChartiin()}>
          <Text style={styles.textClose}>lenkkien pituus</Text>
        </Pressable>

        <Pressable
         style= {styles.Pressable} 
          onPress={() => asetaLenkkiAikaChartiin()}>
          <Text style={styles.textClose}>lenkkien ajat</Text>
        </Pressable>   
          
      </View>  
      
      <View style={styles.PressableContainer}>
        <Pressable
         style= {styles.Pressable2} 
          onPress={() => navigation.navigate("Historia")}>
          <Text style={styles.textPressable}>lenkkien historia</Text>
        </Pressable>
 
      </View>  
                     
          </View>
          <ChartsModal
        ChartsVisible= {ChartsVisibleWeight}
        setChartsVisible={setChartsVisibleWeight}
        DataArr= {Weightdata} 
        Karttamoodi= {karttaMoodi}>     
      </ChartsModal>
      <ChartsModal
        ChartsVisible= {ChartsVisibleJog}
        setChartsVisible={setChartsVisibleJog}
        DataArr= {Jogdata} 
        Karttamoodi= {karttaMoodi}>   
      </ChartsModal>               
          
      </View>
    );
  }


const styles = StyleSheet.create({
image:
    {
    width: width/5,
    height: height/10
    },
container: 
{
  flex: 1,
  backgroundColor: '#9F6BFB',
},
navBox: 
  {
    marginBottom: 20,
    width: width/3,
    height: height/20,
    backgroundColor: '#9F6BFB',
    borderRadius: 10,

  },
containerNodata: 
{
  flex: 1,
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#9F6BFB',
},
textPressable: 
  {
    fontSize: horizontalScale(16),
    fontWeight: 'bold',
    color: '#ffffff'
  },
Pressable2: 
  {
    marginBottom: width/20,
    borderRadius: 10,
    height: height/20,
    width: width/3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9F6BFB'
  },
chart: {
    flex: 1
  },
text: 
  {
    fontSize: horizontalScale(16)
  },
textName: 
  {
    fontSize: horizontalScale(18),
    fontWeight: 'bold'
  },
  flexMaster: 
  {
    gap: width/15,
    flexDirection: 'row'
  },
  flexSingle: 
  {
    margin: width/15,
    gap: width/15,
  },
  textRow: 
  {
    gap: width/15,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  itemtext:
  {
    margin: 2,
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
  },
  textarea: 
  {
    backgroundColor: '#f9f5ff',
    borderColor: '#9F6BFB',
    borderWidth: 1,
    borderRadius: 10,
    margin: width/20,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    height: height/1.4
  },
  textClose: 
  {
    fontSize: horizontalScale(16),
    fontWeight: 'bold'
  },
  Pressable: 
  {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: height/20,
    width: width/3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  PressableContainer: 
  {
    flex: 1,
    flexDirection: 'row',
    gap: width/10,
  },
})
