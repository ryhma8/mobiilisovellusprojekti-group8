import * as SQLite from 'expo-sqlite';
import { DbProps } from '../types/database';


export function Database({db, setDb}: DbProps)
{
    
    const initDB = async () => {  
    const database = await SQLite.openDatabaseAsync('JogAppDb1.db');
    setDb(database);

      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS UserData (
          UserID INTEGER PRIMARY KEY AUTOINCREMENT,
          FirstName TEXT NOT NULL,
          LastName TEXT NOT NULL,
          Weight_Kg REAL NOT NULL CHECK (Weight_kg >= 0),
          Height_Cm REAL NOT NULL CHECK (Height_Cm >= 0),
          Age INTEGER NOT NULL CHECK (Age >= 0)
        );
        CREATE TABLE IF NOT EXISTS JogData (
          JogDataID INTEGER PRIMARY KEY AUTOINCREMENT,
          UserID INTEGER, 
          length_Km REAL NOT NULL CHECK (length >= 0),
          Time_Minutes REAL NOT NULL CHECK (Time_Minutes >= 0),
          FOREIGN KEY(UserID) REFERENCES UserData(UserID) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS GymData (
          GymDataID INTEGER PRIMARY KEY AUTOINCREMENT,
          UserID INTEGER, 
          Rest_Time_Minutes INTEGER NOT NULL CHECK (Rest_Time_Minutes >= 0),
          Repetitions INTEGER NOT NULL CHECK (Repetitions > 0),
          Weight_Kg REAL NOT NULL CHECK (Weight_Kg > 0),
          FOREIGN KEY(UserID) REFERENCES UserData(UserID) ON DELETE CASCADE
        );
        INSERT INTO UserData (FirstName, LastName, Weight_Kg, Height_Cm, Age) VALUES ('Joku', 'Ukko', 123.00, 181.00, 20);
      `);

      loadUserData(database);
    };

    initDB();
}

const loadUserData = async (database: SQLite.SQLiteDatabase) => {
    const result = await database.getAllAsync('SELECT * FROM UserData ORDER BY UserID DESC');
    console.log("loaduserdata test")
    console.log(result)
  };
const AddUser = async ({db}: DbProps) => {
    //if (!db) return;

    //await db.runAsync('INSERT INTO todos (text) VALUES (?)', inputText);
    //setInputText('');
    //loadTodos(db);
  };