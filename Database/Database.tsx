import * as SQLite from 'expo-sqlite';
import { Exercise, UserData, UserWeight } from '../types/database';
import { WeightAndJogdata } from '../types/JogData';
import moment from 'moment';
import { date } from '../types/Date';
import { jogId } from '../types/JogDataId';
import { jogCoordinates } from '../types/jogCoordinates';


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
      await db.runAsync('PRAGMA foreign_keys = ON')
      //loadUserDataToConsole(db)
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
  setUserWeight: React.Dispatch<React.SetStateAction<WeightAndJogdata[]>>,
  setJogData: React.Dispatch<React.SetStateAction<WeightAndJogdata[]>>) => 
  {
  
    const userDataArr = await database.getAllAsync<UserData>(`SELECT * FROM UserData`);
    const UserWeight = await database.getAllAsync<WeightAndJogdata>(`SELECT * FROM UserWeight ORDER BY UserWeightID LIMIT 7`);
    const UserJogs = await database.getAllAsync<WeightAndJogdata>(`SELECT * FROM JogData ORDER BY JogDataID LIMIT 7`); // order by userweightid, haetaan aina viimeisin käyttäjän paino

    console.log(UserWeight)
    setUserData(userDataArr)
    setUserWeight(UserWeight)
    setJogData(UserJogs)
  };

export const loadNewestWeight = async (
  database: SQLite.SQLiteDatabase,
  setNewestWeight: React.Dispatch<React.SetStateAction<WeightAndJogdata[]>>) =>
  {
    const NewestUserWeight = await database.getAllAsync<WeightAndJogdata>(`SELECT * FROM UserWeight UserWeightID ORDER BY UserWeightID DESC`);
    setNewestWeight(NewestUserWeight)
  };

const loadUserDataToConsole = async (database: SQLite.SQLiteDatabase) =>
  {
    const userDataArr = await database.getAllAsync<UserData>(`SELECT * FROM UserData ORDER BY UserID DESC`);
    //console.log(userDataArr)
  };

export const AddProfile = async (etuNimi: string, sukuNimi: string, ikä: string, paino: string, pituus: string, database: SQLite.SQLiteDatabase): Promise<SQLite.SQLiteRunResult> => {
    
    const resultData = await database!.runAsync('INSERT INTO UserData (UserID, FirstName, LastName, Age, Height_Cm) VALUES (1,?,?,?,?)', etuNimi, sukuNimi, ikä, pituus)
    const resultWeight = await database!.runAsync("INSERT INTO UserWeight (UserID, Weight_Kg, Date) VALUES (1,?, strftime('%d %m'))", paino)  

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
        await db.runAsync("INSERT INTO JogData (UserID, Avg_Speed, Calories_Burned, length_Km, Time_Minutes, Jog_Coordinates, Jog_Date) VALUES (1,?,?,?,?,?,strftime('%d %m'))", fromStartMsToKm, calories, distance, minutes, coordsStringify )
        const jogDataArrLength = await db.getAllAsync<WeightAndJogdata>(`SELECT * FROM JogData`);

        console.log("coordsstring: "+ coordsStringify)
        console.log("jogdata length: "+ jogDataArrLength.length)

        if(jogDataArrLength.length >= 10)
          {
              const latestJogID = await db.getFirstAsync<jogId>(`SELECT JogDataID FROM JogData ORDER By JogDataID`) //haetaan vanhin jogdata id
              console.log("latestJogID: "+ latestJogID?.JogDataID)
              if(latestJogID?.JogDataID)
              {
              await db.runAsync('DELETE FROM JogData WHERE JogDataID =?', latestJogID.JogDataID) //hävitetään vanhin jog recordi.
              }
          }
    };

export const updateProfile = async (ikä: number, pituus: number, Fname:string, Lname:string, database: SQLite.SQLiteDatabase) => {
    
    console.log("ikä " + ikä + " " + "pituus " + pituus)
    const resultData = await database!.runAsync('UPDATE UserData SET Age =?, Height_Cm =?, FirstName =?, LastName =? WHERE UserID =1', ikä, pituus, Fname, Lname)
    console.log(resultData)
  };

export const AddNewWeight = async (Weight_Kg: number, database: SQLite.SQLiteDatabase) => 
  {
      await database!.runAsync("INSERT INTO UserWeight (UserID, Weight_Kg, Date) VALUES (1,?,strftime('%d %m'))", [Weight_Kg])
  };
    
export const loadGymData = async (setgymExerList: React.Dispatch<React.SetStateAction<Exercise[]>>, database: SQLite.SQLiteDatabase | null) => {
  
  console.log("ennen")
  if (!database) return
  const tableData = await database.getAllAsync<Exercise>(`SELECT * FROM GymData ORDER BY GymDataID DESC`);
  //console.log("tässä on " +tableData[0].Rest_Time_Minutes.toString())
  setgymExerList(tableData)
};

export const loadJogArr = async (
  setJogArr: React.Dispatch<React.SetStateAction<string | undefined>>, 
  database: SQLite.SQLiteDatabase | null,
  id:number):Promise<string | undefined> => {

  
  if (!database) return ""
  //const JogObjall = await database.getAllAsync<string>(`SELECT * FROM JogData`);
  const JogObj = await database.getAllAsync<jogCoordinates>(`SELECT Jog_Coordinates FROM JogData WHERE JogDataID =?`, [id]);  //SELECT Jog_Coordinates FROM JogData WHERE JogDataID =?` [id]
  
  console.log("jogobj: ", JogObj[0].Jog_Coordinates)
  
  setJogArr(JogObj[0].Jog_Coordinates)
  return JogObj[0].Jog_Coordinates
};

export const AddExercise = async (lepo: string, toisto: string, paino: string, Exec: string, sarja: string, db: SQLite.SQLiteDatabase | null) => {
  if (!db) return;
  console.log("INSERT ", { lepo, toisto, paino, Exec, sarja });
  const execData = await db.runAsync('INSERT INTO GymData (UserID, Rest_Time_Minutes, Repetitions, Weight_Kg, Exercise_Type, Set_Amount) VALUES (1,?,?,?,?,?)', [lepo, toisto, paino, Exec, sarja])
}
