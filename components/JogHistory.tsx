import React, { useState } from "react";
import { loadJogArr } from "../Database/Database";
import * as SQLite from 'expo-sqlite';

export async function JogHistory(db: SQLite.SQLiteDatabase | null, setJogArr: React.Dispatch<React.SetStateAction<string | undefined>>) {

    console.log("called")


    let coords = await loadJogArr(setJogArr, db, 6); //vaihda id 6 joksikin omaksi toimivaksi ID:ksi, muuten tulee error
    let coordCleaned = coords!.replaceAll("\\", "")
    let coordToObj = JSON.parse(coordCleaned)
    console.log("coordCleaned tyyppi: "+typeof(coordCleaned)+ " "+"coordToObj tyyppi: "+typeof(coordToObj))
    console.log("coordToObj: ", coordToObj)
}
