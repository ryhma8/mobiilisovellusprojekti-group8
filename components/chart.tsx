import { View } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { Text } from "react-native-gesture-handler";
import {useFont } from "@shopify/react-native-skia";
import '@fontsource-variable/inter';

export function MyChart() {
  
  const inter = require("../roboto.ttf"); 
  const fontti = useFont(inter, 12)

const testiObjekti = 
{
  x:7,
  y:10
}
const dummyData = 
[
  {
    x: 1,
    y: 25
  },
  {
    x: 2,
    y: 30
  }
  ,
  {
    x: 3,
    y: 35
  }
  ,
  {
    x: 4,
    y: 36
  }
  ,
  {
    x: 5,
    y: 39
  }
  ,
  {
    x: 6,
    y: 52
  }
]
dummyData.push(testiObjekti)

  return (
    <View style={{ height: 250, width: 350, backgroundColor: '#c9afaf', padding: 20}}>
      <CartesianChart
        data={dummyData} 
        xKey="x" 
        yKeys={["y"]} 
        domainPadding={{top: 30, bottom: 30}}
        axisOptions={{
          labelColor: '#815151',
          font: fontti
        }}
        
      >
        {}
        {({ points }) => (
          <Line 
          points={points.y} 
          color="red" strokeWidth={3}
          animate={{ type: "timing", duration: 500 }} />
        )}
      </CartesianChart>
    </View>
  );
}


