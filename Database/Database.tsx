import * as SQLite from 'expo-sqlite';
import { DbProps, RefreshDbProps } from '../types/database';

type UserID = 
{
  UserID: number
}
/*export function RefreshUIData({setDb}: RefreshDbProps)
{
  const initDB = async () => 
    {
      const database = await SQLite.openDatabaseAsync('JogAppDbdev.db');
      setDb(database);
      console.log("refresh")
    };
 
    initDB();
}*/
export function Database({db, setDb, setUserId}: DbProps)
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
          FOREIGN KEY(UserID) REFERENCES UserData(UserID) ON DELETE CASCADE
        );      
      `);


      loadUserData(database);
      const userid = await getUserID(database)
      setUserId(userid)
    };

    initDB();
}

const loadUserData = async (database: SQLite.SQLiteDatabase) => {
    const result = await database.getAllAsync('SELECT * FROM UserData ORDER BY UserID DESC');
    console.log("loaduserdata test")
    console.log(result)
  };
export const AddProfile = async (etuNimi: string, sukuNimi: string, ikä: string, paino: string, pituus: string, db: SQLite.SQLiteDatabase | null) => {
    
  if (!db) return;
    const result = await db.runAsync('INSERT INTO UserData (UserID, FirstName, LastName, Weight_Kg, Height_Cm, Age, Date) VALUES (1,?,?,?,?,?, date())', etuNimi, sukuNimi, paino, pituus, ikä) 
    //kovakoodataan userid 1, niin ei voi missään tapauksessa muodostua dublikaatti recordeja ja voi olla ainoastaan 1 käyttäjä.

    const database = await SQLite.openDatabaseAsync('JogAppDbdev.db');
    loadUserData(database)
  };

const getUserID = async(db: SQLite.SQLiteDatabase | null) => //tällä haetaan käyttäjän ID alussa jota käytetään käyttjän muiden taulujen SQL kyselyiden parametriksi
{
  
  if (!db) return;

  console.log("getuser test" +JSON.stringify(db))
  
    const sql = db.sql
    const id = await sql<UserID>`SELECT UserID from UserData`;
  if(id.length == 0) return
  
  console.log("käyttäjän ID on:")
  console.log(id[0].UserID)
  return id[0].UserID
}
  export const purgeDb = async() =>
{
  const database = await SQLite.openDatabaseAsync('JogAppDbdev.db');
  await database.runAsync('DELETE FROM UserData')
}