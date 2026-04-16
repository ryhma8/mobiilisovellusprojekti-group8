import { Dimensions, View, Text } from "react-native";
import { CartesianChart, Line } from "victory-native";
import {useFont } from "@shopify/react-native-skia";
import { chartProps } from "../types/ChartProps";
import { useEffect } from "react";
import { Karttamoodi } from "../types/karttamoodiEnum";
import DataTableTitle from "react-native-paper/lib/typescript/components/DataTable/DataTableTitle";

const { width, height } = Dimensions.get("window");


export function MyChart({DataArr, Karttamoodi}: chartProps) {
  
  const painonMuutos = laskePainonmuutos()
  const kumulatiivinenLenkkiMatka = laskekumulatiivinenLenkkienMatka()
  const kumulatiivinenLKalorit = laskekumulatiivinenKalorit()
  const kumulatiivinenLAika = laskekumulatiivinenAika()

  const inter = require("../roboto.ttf"); 
  const fontti = useFont(inter, 12)  
  
  if(Karttamoodi == "paino")
  {
  return (
    <View style={{ height: height/2.5, width: width/1.1, backgroundColor: '#e2d1ff', padding: 20}}>
      <CartesianChart
        data={DataArr} 
        xKey="Date" 
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
        <Text>Painon kehitys: {painonMuutos}</Text>
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
        <Text>7vrk lenkkien pituus yhteensä: {kumulatiivinenLenkkiMatka}</Text>
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
        <Text>7vrk lenkkien aika yhteensä: {kumulatiivinenLAika}</Text>
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
        <Text>7vrk poltetut kalorit: {kumulatiivinenLKalorit}</Text>
      </View>
    </View>
  );
  }

   function laskePainonmuutos()
  {
    if(DataArr.length < 1) return 0

    let painonMuutos = 0
    let ekaPaino  = DataArr[0].Weight_Kg
    let seuraavaPaino = 0

        for(let iteraatio = 0; iteraatio < DataArr.length; iteraatio++)
      {
        seuraavaPaino = DataArr[iteraatio].Weight_Kg //muutetaan seuraava paino loopin iteraation mukaisesti ennen kuin eka paino muutetaan, jolloin saadaan laskettua uuden ja vanhan painon erotus

        painonMuutos += ekaPaino - seuraavaPaino

        ekaPaino = DataArr[iteraatio].Weight_Kg
        console.log(painonMuutos)
      }
    return painonMuutos.toFixed(2)
  }
  function laskekumulatiivinenLenkkienMatka()
  {
    let kumulatiivinenMatka = 0

    if(DataArr.length < 1) return 0

        for(let iteraatio = 0; iteraatio < DataArr.length; iteraatio++)
      {
        kumulatiivinenMatka += DataArr[iteraatio].length_Km
        console.log(kumulatiivinenMatka)
      }
    return kumulatiivinenMatka.toFixed(2)
  } 

   function laskekumulatiivinenKalorit()
  {
    let kumulatiivinenKalorit = 0

    if(DataArr.length < 1) return 0

        for(let iteraatio = 0; iteraatio < DataArr.length; iteraatio++)
      {
        kumulatiivinenKalorit += DataArr[iteraatio].Calories_Burned
        console.log(kumulatiivinenKalorit)
      }
    return kumulatiivinenKalorit.toFixed(2)
  }
    function laskekumulatiivinenAika()
  {
    let kumulatiivinenAika = 0

    if(DataArr.length < 1) return 0

        for(let iteraatio = 0; iteraatio < DataArr.length; iteraatio++)
      {
        kumulatiivinenAika += DataArr[iteraatio].Time_Minutes
        console.log(kumulatiivinenAika)
      }
    return kumulatiivinenAika.toFixed(2)
  }

}

