import React, { useState } from "react";
import { loadJogArr } from "../Database/Database";
import { useSQLiteContext } from "expo-sqlite";
import * as SQLite from 'expo-sqlite';

export async function JogHistory(db: SQLite.SQLiteDatabase | null, setJogArr: React.Dispatch<React.SetStateAction<string[]>>) {

    console.log("called")
    const data = await loadJogArr(setJogArr, db, 1);
    //console.log("data: ", data)
    const nestedData = data![0]
    //console.log("nested data: ", nestedData)
    const coordsData = nestedData.Jog_Coordinates
    console.log("coords data: ", coordsData)

    return coordsData;
}
