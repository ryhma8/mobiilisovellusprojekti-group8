import React, { useState } from "react";
import { loadJogArr } from "../Database/Database";
import { useSQLiteContext } from "expo-sqlite";
import * as SQLite from 'expo-sqlite';

export function JogHistory(db: SQLite.SQLiteDatabase | null, setJogArr: React.Dispatch<React.SetStateAction<string[]>>) {

    console.log("called")

    async function getdata() {
    const coords = await loadJogArr(setJogArr,db, 1)
    const coords2 = coords

        console.log("prev ")
        //const output = coords![0].toString().replace(/\\/g, '');
        console.log("loaded jog coordinates ", coords2!.replace(/\\/g, ''))
    
    //const strToOgj = JSON.parse(coords!)

    
    }
    getdata()
}
