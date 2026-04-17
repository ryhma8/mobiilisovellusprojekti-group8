import { Dimensions, View, Text } from "react-native";
import { CartesianChart, Line } from "victory-native";
import {useFont } from "@shopify/react-native-skia";
import { chartProps } from "../types/ChartProps";
import { WeightAndJogdata } from "../types/JogData";
import { useState } from "react";

const { width, height } = Dimensions.get("window");


export function MyChart({DataArr, Karttamoodi}: chartProps) {

   
  checkArrData() //tsekataan dataarr tyhjistä elementeistä
  const painonMuutos = laskePainonmuutos()
  const kumulatiivinenLenkkiMatka = laskekumulatiivinenLenkkienMatka()
  const kumulatiivinenLKalorit = laskekumulatiivinenKalorit()
  const kumulatiivinenLAika = laskekumulatiivinenAika()

  const inter = require("../roboto.ttf"); 
  const fontti = useFont(inter, 12)  
  
  if(Karttamoodi == "paino")
  {
    console.log("painomoodi, " + "datarr length: " + DataArr.length + " " + " painot: " + DataArr[0].Weight_Kg)
  return (
    <View style={{ height: height/2.5, width: width/1.1, backgroundColor: '#e2d1ff', padding: 20}}>
      <CartesianChart
        data={DataArr} 
        xKey="Date"
        domain={{x: [1, 7]}} 
        yKeys={["Weight_Kg"]}    
        domainPadding={{top: 30, bottom: 30}}
        axisOptions={{
          tickCount: DataArr.length, //tää sitä varten, että kartta luo oikean määrän ruudukoita. vakiona heittelee vähän sinnepäin ruutujen määrän.
          labelColor: '#ff1a1a',
          font: fontti,  
        }}
        
      >
        {}
        {({ points }) => (
          <Line 
          points={points.Weight_Kg} 
          color="red" strokeWidth={3}
          animate={{ type: "timing", duration: 500 }} />
        )}
      </CartesianChart>

      <View>
        <Text>Painon kehitys: {painonMuutos} kg</Text>
      </View>
    </View>
  );
}
else if(Karttamoodi == "pituusAvg")
  {
    return (
    <View style={{ height: height/2.5, width: width/1.1, backgroundColor: '#e2d1ff', padding: 20}}>
      <CartesianChart
        data={DataArr} 
        xKey="Jog_Date" 
        yKeys={["Avg_Speed"]}    
        domainPadding={{top: 30, bottom: 30}}
        axisOptions={{
          tickCount: DataArr.length,
          labelColor: '#ff1a1a',
          font: fontti
        }}
        
      >
        {}
        {({ points }) => (
          <Line 
          points={points.Avg_Speed} 
          color="red" strokeWidth={3}
          animate={{ type: "timing", duration: 500 }} />
        )}
      </CartesianChart>
      <View>
        <Text>7vrk lenkkien pituus yhteensä: {kumulatiivinenLenkkiMatka} km</Text>
      </View>
    </View>
  );
  }
else if(Karttamoodi == "lenkkiAika")
  {
    return (
    <View style={{ height: height/2.5, width: width/1.1, backgroundColor: '#e2d1ff', padding: 20}}>
      <CartesianChart
        data={DataArr} 
        xKey="Jog_Date" 
        yKeys={["Time_Minutes"]}    
        domainPadding={{top: 30, bottom: 30}}
        axisOptions={{
          tickCount: DataArr.length,
          labelColor: '#ff1a1a',
          font: fontti
        }}
        
      >
        {}
        {({ points }) => (
          <Line 
          points={points.Time_Minutes} 
          color="red" strokeWidth={3}
          animate={{ type: "timing", duration: 500 }} />
        )}
      </CartesianChart>
      <View>
        <Text>7vrk lenkkien aika yhteensä: {kumulatiivinenLAika} tuntia</Text>
      </View>
    </View>
  );
  }
else if(Karttamoodi == "lenkkiCal")
  {
    return (
    <View style={{ height: height/2.5, width: width/1.1, backgroundColor: '#e2d1ff', padding: 20}}>
      <CartesianChart
        data={DataArr} 
        xKey="Jog_Date" 
        yKeys={["Calories_Burned"]}    
        domainPadding={{top: 30, bottom: 30}}
        axisOptions={{
          tickCount: DataArr.length,
          labelColor: '#ff1a1a',
          font: fontti
        }}
        
      >
        {}
        {({ points }) => (
          <Line 
          points={points.Calories_Burned} 
          color="red" strokeWidth={3}
          animate={{ type: "timing", duration: 500 }} />
        )}
      </CartesianChart>
      <View>
        <Text>7vrk poltetut kalorit: {kumulatiivinenLKalorit} kcal</Text>
      </View>
    </View>
  );
  }

  function checkArrData()
  {
    const placeholderArr:WeightAndJogdata[] = 
    [{
    Avg_Speed: 0,
    Calories_Burned: 0,
    length_Km: 0,
    Time_Minutes: 0,
    Jog_Coordinates: "",
    Jog_Date: " ",
    Weight_Kg: 0,
    Date: " "
   }]

   if(DataArr.length == 0)  
    {
      console.log("nolla pituus!")
      DataArr = placeholderArr
    }
  // console.log("dataarr pituus on: " + DataArr.length)
  for(let i = 0; i < DataArr.length; i++) //käydään läpi kaikki recordien itemit/elementit ja jos ne on null/undefined tms niin tehdään niistä 0 tai tyhjä string. täten ei tuu erroria charteissa.
    {
      if(!DataArr[i].Avg_Speed) DataArr[i].Avg_Speed = placeholderArr[0].Avg_Speed
      if(!DataArr[i].Calories_Burned) DataArr[i].Calories_Burned = placeholderArr[0].Calories_Burned
      if(!DataArr[i].length_Km) DataArr[i].length_Km = placeholderArr[0].length_Km
      if(!DataArr[i].Time_Minutes) DataArr[i].Time_Minutes = placeholderArr[0].Time_Minutes
      if(!DataArr[i].Jog_Coordinates) DataArr[i].Jog_Coordinates = placeholderArr[0].Jog_Coordinates
      if(!DataArr[i].Jog_Date) DataArr[i].Jog_Date = placeholderArr[0].Jog_Date
      if(!DataArr[i].Weight_Kg) DataArr[i].Weight_Kg = placeholderArr[0].Weight_Kg
      if(!DataArr[i].Date) DataArr[i].Date = placeholderArr[0].Date
      console.log("käyttäjän paino check " +JSON.stringify(DataArr[i].Weight_Kg))
    }
  }


   function laskePainonmuutos()
  {
    if(DataArr == undefined || DataArr.length == 0) return 0

    let painonMuutos = 0
    let ekaPaino  = DataArr[0].Weight_Kg
    let seuraavaPaino = 0

        for(let iteraatio = 0; iteraatio < DataArr.length; iteraatio++)
      {
        seuraavaPaino = DataArr[iteraatio].Weight_Kg //muutetaan seuraava paino loopin iteraation mukaisesti ennen kuin eka paino muutetaan, jolloin saadaan laskettua uuden ja vanhan painon erotus

        painonMuutos += ekaPaino - seuraavaPaino

        ekaPaino = DataArr[iteraatio].Weight_Kg
      }
    return painonMuutos  * -1 .toFixed(2)
  }
  function laskekumulatiivinenLenkkienMatka()
  {
    let kumulatiivinenMatka = 0

    if(DataArr[0].length_Km == undefined || DataArr.length == 0) return 0

        for(let iteraatio = 0; iteraatio < DataArr.length; iteraatio++)
      {
        kumulatiivinenMatka += DataArr[iteraatio].length_Km
      }
    return kumulatiivinenMatka.toFixed(2)
  } 

   function laskekumulatiivinenKalorit()
  {
    let kumulatiivinenKalorit = 0

    if(DataArr[0].Calories_Burned == undefined) return 0

        for(let iteraatio = 0; iteraatio < DataArr.length; iteraatio++)
      {
        kumulatiivinenKalorit += DataArr[iteraatio].Calories_Burned
      }
    return kumulatiivinenKalorit.toFixed(2)
  }
    function laskekumulatiivinenAika()
  {
    let kumulatiivinenAika = 0

    if(DataArr[0].Time_Minutes == undefined || DataArr.length == 0) return 0

        for(let iteraatio = 0; iteraatio < DataArr.length; iteraatio++)
      {
        kumulatiivinenAika += DataArr[iteraatio].Time_Minutes
      }
    return kumulatiivinenAika.toFixed(2)
  }

}

