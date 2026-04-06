import { Dimensions, View } from "react-native";
import { CartesianChart, Line } from "victory-native";
import {useFont } from "@shopify/react-native-skia";
import { chartProps } from "../types/ChartProps";
import { useEffect } from "react";

const { width, height } = Dimensions.get("window");


export function MyChart({jogDataArr}: chartProps) {
  
  
  const inter = require("../roboto.ttf"); 
  const fontti = useFont(inter, 12)  

  return (
    <View style={{ height: height/2.5, width: width/1.1, backgroundColor: '#e2d1ff', padding: 20}}>
      <CartesianChart
        data={jogDataArr} 
        xKey="date" 
        yKeys={["distanceJogged"]}    
        domainPadding={{top: 30, bottom: 30}}
        axisOptions={{
          tickCount: jogDataArr.length, //tää sitä varten, että kartta luo oikean määrän ruudukoita. vakiona heittelee vähän sinnepäin ruutujen määrän.
          labelColor: '#ff1a1a',
          font: fontti
        }}
        
      >
        {}
        {({ points }) => (
          <Line 
          points={points.distanceJogged} 
          color="red" strokeWidth={3}
          animate={{ type: "timing", duration: 500 }} />
        )}
      </CartesianChart>
    </View>
  );
}


