import * as SQLite from 'expo-sqlite';
import { DbProps, Exercise, UserData, UserWeight } from '../types/database';

export function Database({ db, setDb, setUserData, setUserWeight }: DbProps) {

  const initDB = async () => {
    const database = await SQLite.openDatabaseAsync('JogAppDb3dev.db');
    setDb(database);

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS UserData (
          UserID INTEGER PRIMARY KEY,
          FirstName TEXT NOT NULL,
          LastName TEXT NOT NULL,
          Height_Cm REAL NOT NULL CHECK (Height_Cm >= 0),
          Age INTEGER NOT NULL CHECK (Age >= 0)
        );
        CREATE TABLE IF NOT EXISTS UserWeight (
          UserWeightID INTEGER PRIMARY KEY AUTOINCREMENT,
          UserID INTEGER NOT NULL, 
          Weight_Kg REAL NOT NULL CHECK (Weight_kg >= 0),
          Date TIMESTAMP NOT NULL,
          FOREIGN KEY(UserID) REFERENCES UserData(UserID) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS JogData (
          JogDataID INTEGER PRIMARY KEY AUTOINCREMENT,
          UserID INTEGER NOT NULL, 
          length_Km REAL NOT NULL CHECK (length_Km >= 0),
          Time_Minutes REAL NOT NULL CHECK (Time_Minutes >= 0),
          Jog_Date TIMESTAMP NOT NULL,
          FOREIGN KEY(UserID) REFERENCES UserData(UserID) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS GymData (
          GymDataID INTEGER PRIMARY KEY AUTOINCREMENT,
          UserID INTEGER NOT NULL, 
          Rest_Time_Minutes INTEGER NOT NULL CHECK (Rest_Time_Minutes >= 0),
          Repetitions INTEGER NOT NULL CHECK (Repetitions > 0),
          Weight_Kg REAL NOT NULL CHECK (Weight_Kg > 0),
          Exercise_Type TEXT NOT NULL,
          Set_Amount INTEGER NOT NULL,
          FOREIGN KEY(UserID) REFERENCES UserData(UserID) ON DELETE CASCADE
        );      
      `);


    loadUserData(database, setUserData, setUserWeight);
  };
  initDB();
}

const loadUserData = async (
  database: SQLite.SQLiteDatabase,
  setUserData: React.Dispatch<React.SetStateAction<UserData[]>>,
  setUserRecords: React.Dispatch<React.SetStateAction<UserWeight[]>>) => {

  const sql = database.sql
  const userDataArr = await sql<UserData>`SELECT * FROM UserData ORDER BY UserID DESC`;
  const userRecords = await sql<UserWeight>`SELECT * FROM UserWeight ORDER BY UserID DESC`;
  console.log(userDataArr)
  setUserData(userDataArr)
  setUserRecords(userRecords)
};

export const loadGymData = async (
  setgymExerList: React.Dispatch<React.SetStateAction<Exercise[]>>) => {
  console.log("ennen")
  const database = await SQLite.openDatabaseAsync('JogAppDb3dev.db');
  if(!database) return
  const sql = database.sql
  
  const tableData= await sql<Exercise>`SELECT * FROM GymData ORDER BY GymDataID DESC`;
  console.log("tässä on " +tableData[1].Rest_Time_Minutes)
  setgymExerList(tableData)
};



export const AddProfile = async (etuNimi: string, sukuNimi: string, ikä: string, paino: string, pituus: string, db: SQLite.SQLiteDatabase | null) => {

  if (!db) return;
  const resultData = await db.runAsync('INSERT INTO UserData (UserID, FirstName, LastName, Age, Height_Cm) VALUES (1,?,?,?,?)', etuNimi, sukuNimi, ikä, pituus)
  const resultWeight = await db.runAsync('INSERT INTO UserWeight (UserID, Weight_Kg, Date) VALUES (1,?, date())', paino)
  //kovakoodataan userid 1, niin ei voi missään tapauksessa muodostua dublikaatti recordeja ja voi olla ainoastaan 1 käyttäjä.
};
export const AddExercise = async (lepo: string, toisto: string, paino: string, liike: string, sarja: string, db: SQLite.SQLiteDatabase | null) => {
  if (!db) return;
  const execData = await db.runAsync('INSERT INTO GymData (UserID, Rest_Time_Minutes, Repetitions, Weight_Kg, Exercise_Type, Set_Amount) VALUES (1,?,?,?,?,?)', lepo, toisto, paino, liike, sarja)
}

export const purgeDb = async (database: SQLite.SQLiteDatabase | null) => {
  if (!database) return;
  console.log("dbpurge")
  await database.runAsync('DELETE FROM UserData')
}