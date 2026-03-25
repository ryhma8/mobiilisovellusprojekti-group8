import * as SQLite from 'expo-sqlite';
import { DbProps, UserData } from '../types/database';

export function Database({db, setDb, setUserData}: DbProps)
{
    
    const initDB = async () => {
    const database = await SQLite.openDatabaseAsync('JogAppDb1dev.db');
    setDb(database);

      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS UserData (
          UserID INTEGER PRIMARY KEY,
          FirstName TEXT NOT NULL,
          LastName TEXT NOT NULL,
          Weight_Kg REAL NOT NULL CHECK (Weight_kg >= 0),
          Height_Cm REAL NOT NULL CHECK (Height_Cm >= 0),
          Age INTEGER NOT NULL CHECK (Age >= 0),
          Date TIMESTAMP NOT NULL
        );
        CREATE TABLE IF NOT EXISTS JogData (
          JogDataID INTEGER PRIMARY KEY AUTOINCREMENT,
          UserID INTEGER NOT NULL, 
          length_Km REAL NOT NULL CHECK (length_Km >= 0),
          Time_Minutes REAL NOT NULL CHECK (Time_Minutes >= 0),
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


      loadUserData(database, setUserData);
    };
    initDB();
}

const loadUserData = async (database: SQLite.SQLiteDatabase, setUserData: React.Dispatch<React.SetStateAction<UserData[]>>) => {
   
    const sql = database.sql
    const userDataArr = await sql<UserData>`SELECT * FROM UserData ORDER BY UserID DESC`;
    console.log(userDataArr)
    setUserData(userDataArr)
  };
export const AddProfile = async (etuNimi: string, sukuNimi: string, ikä: string, paino: string, pituus: string, db: SQLite.SQLiteDatabase | null) => {
    
  if (!db) return;
    const result = await db.runAsync('INSERT INTO UserData (UserID, FirstName, LastName, Weight_Kg, Height_Cm, Age, Date) VALUES (1,?,?,?,?,?, date())', etuNimi, sukuNimi, paino, pituus, ikä) 
    //kovakoodataan userid 1, niin ei voi missään tapauksessa muodostua dublikaatti recordeja ja voi olla ainoastaan 1 käyttäjä.
  };

  export const purgeDb = async(database: SQLite.SQLiteDatabase | null) =>
{
  if (!database) return;
  console.log("dbpurge")
  await database.runAsync('DELETE FROM UserData')
}