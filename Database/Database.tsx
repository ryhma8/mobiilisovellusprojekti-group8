import * as SQLite from 'expo-sqlite';
import { DbProps, Exercise, UserData, UserWeight } from '../types/database';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { Jogdata } from '../types/JogData';


export async function InitDatabase(db: SQLite.SQLiteDatabase)
{
    if(!db) return

    const initDB = async () => {
      await db.execAsync(`
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
          Avg_Speed REAL NOT NULL,
          Calories_Burned REAL NOT NULL,
          length_Km REAL NOT NULL CHECK (length_Km >= 0),
          Time_Minutes REAL NOT NULL CHECK (Time_Minutes >= 0),
          Jog_Coordinates TEXT NOT NULL,
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
         CREATE TABLE IF NOT EXISTS TrainData (
          TrainDataID INTEGER PRIMARY KEY AUTOINCREMENT,
          UserID INTEGER NOT NULL,
          TrainName STRING NOT NULL,
          Exec1 INTEGER,
          Exec2 INTEGER,
          Exec3 INTEGER,
          Exec4 INTEGER,
          Exec5 INTEGER,
          Exec6 INTEGER,
          Exec7 INTEGER,
          Exec8 INTEGER,
          Exec9 INTEGER,
          Exec10 INTEGER,
          FOREIGN KEY(UserID) REFERENCES UserData(UserID) ON DELETE CASCADE
        );       
      `);
    };

    try {
      await initDB();
      loadUserDataToConsole(db)
    } catch (error) {
      alert("tietokantavirhe, käynnistä sovellus uudelleen")
    }  
}

/*export async function Database({db, setDb, setUserData, setUserWeight}: DbProps)
{
    const initDB = async () => {
    const database = await SQLite.openDatabaseAsync('JogAppDb4dev.db');
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
          Avg_Speed REAL NOT NULL,
          Calories_Burned REAL NOT NULL,
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
        CREATE TABLE IF NOT EXISTS TrainData (
          TrainDataID INTEGER PRIMARY KEY AUTOINCREMENT,
          UserID INTEGER NOT NULL,
          Liike1 INTEGER,
          Liike2 INTEGER,
          Liike3 INTEGER,
          Liike4 INTEGER,
          Liike5 INTEGER,
          Liike6 INTEGER,
          Liike7 INTEGER,
          Liike8 INTEGER,
          Liike9 INTEGER,
          FOREIGN KEY(UserID) REFERENCES UserData(UserID) ON DELETE CASCADE
        ); 
      `);


      loadUserData(database, setUserData, setUserWeight);
    };

    try {
      await initDB();
    } catch (error) {
      alert("tietokantavirhe, käynnistä sovellus uudelleen")
    }

   
}*/

export const loadUserData = async (
  database: SQLite.SQLiteDatabase, 
  setUserData: React.Dispatch<React.SetStateAction<UserData[]>>,
  setUserWeight: React.Dispatch<React.SetStateAction<UserWeight[]>>) => 
  {
   
    const userDataArr = await database.getAllAsync<UserData>(`SELECT * FROM UserData ORDER BY UserID DESC`);
    const UserWeight = await database.getAllAsync<UserWeight>(`SELECT * FROM UserWeight ORDER BY UserID DESC`);
    console.log(userDataArr)
    setUserData(userDataArr)
    setUserWeight(UserWeight)
  };

const loadUserDataToConsole = async (database: SQLite.SQLiteDatabase) =>
  {
    const userDataArr = await database.getAllAsync<UserData>(`SELECT * FROM UserData ORDER BY UserID DESC`);
    console.log(userDataArr)
  };

export const AddProfile = async (etuNimi: string, sukuNimi: string, ikä: string, paino: string, pituus: string, database: SQLite.SQLiteDatabase): Promise<SQLite.SQLiteRunResult> => {
    
    const resultData = await database!.runAsync('INSERT INTO UserData (UserID, FirstName, LastName, Age, Height_Cm) VALUES (1,?,?,?,?)', etuNimi, sukuNimi, ikä, pituus)
    const resultWeight = await database!.runAsync('INSERT INTO UserWeight (UserID, Weight_Kg, Date) VALUES (1,?, date())', paino)  

    console.log(resultData)
    return resultData
    //kovakoodataan userid 1, niin ei voi missään tapauksessa muodostua dublikaatti recordeja ja voi olla ainoastaan 1 käyttäjä.
  };

export const purgeDb = async(database: SQLite.SQLiteDatabase | null) =>
{
  if (!database) return;
  console.log("dbpurge")
  await database.runAsync('DELETE FROM UserData')
}

export const AddNewJog = async (fromStartMsToKm: number, calories: number, distance: number, time_seconds: number, coordsStringify: string, db: SQLite.SQLiteDatabase | null) => {
        
        if (!db) return;

        const minutes = time_seconds / 1000 / 60;

        console.log("cords ", coordsStringify)
    
        const resultData = await db.runAsync('INSERT INTO JogData (UserID, Avg_Speed, Calories_Burned, length_Km, Time_Minutes, Jog_Coordinates, Jog_Date) VALUES (1,?,?,?,?,?,date())', fromStartMsToKm, calories, distance, minutes, coordsStringify )
        //kovakoodataan userid 1, niin ei voi missään tapauksessa muodostua dublikaatti recordeja ja voi olla ainoastaan 1 käyttäjä.
        console.log("resultData: ",resultData)

        const xd = await db.getAllAsync<Jogdata>(`SELECT * FROM JogData`);
        //console.log("joggi data ", xd[6].Jog_Coordinates)


    };
export const loadGymData = async (setgymExerList: React.Dispatch<React.SetStateAction<Exercise[]>>, database: SQLite.SQLiteDatabase | null) => {
  
  console.log("ennen")
  if (!database) return
  const tableData = await database.getAllAsync<Exercise>(`SELECT * FROM GymData ORDER BY GymDataID DESC`);
  //console.log("tässä on " +tableData[0].Rest_Time_Minutes.toString())
  setgymExerList(tableData)
};

export const loadJogArr = async (
  setJogArr: React.Dispatch<React.SetStateAction<string[]>>, 
  database: SQLite.SQLiteDatabase | null,
  id:number):Promise<string[] | undefined> => {
  
  if (!database) return
  const JogObj = await database.getAllAsync<string>(`SELECT Jog_Coordinates FROM JogData WHERE JogDataID =?`, [id]);  //SELECT Jog_Coordinates FROM JogData WHERE JogDataID =?` [id]
  //console.log("tässä on " +tableData[0].Rest_Time_Minutes.toString())
  console.log("jogobj[0]: ", JogObj[0])
  setJogArr(JogObj)
  return JogObj
};

export const AddExercise = async (lepo: string, toisto: string, paino: string, Exec: string, sarja: string, db: SQLite.SQLiteDatabase | null) => {
  if (!db) return;
  console.log("INSERT ", { lepo, toisto, paino, Exec, sarja });
  const execData = await db.runAsync('INSERT INTO GymData (UserID, Rest_Time_Minutes, Repetitions, Weight_Kg, Exercise_Type, Set_Amount) VALUES (1,?,?,?,?,?)', [lepo, toisto, paino, Exec, sarja])
}
