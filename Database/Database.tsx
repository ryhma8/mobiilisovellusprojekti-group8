import * as SQLite from 'expo-sqlite';
import { Exercise, TrainDay, Training, UserData, UserWeight } from '../types/database';
import { WeightAndJogdata } from '../types/JogData';
import { date } from '../types/Date';
import { jogId } from '../types/JogDataId';
import { jogCoordinates } from '../types/jogCoordinates';


export async function InitDatabase(db: SQLite.SQLiteDatabase) {
  if (!db) return

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
          Weight_Kg REAL,
          Exercise_Type TEXT NOT NULL,
          Set_Amount INTEGER ,
          FOREIGN KEY(UserID) REFERENCES UserData(UserID) ON DELETE CASCADE
        );
         CREATE TABLE IF NOT EXISTS TrainData (
          TrainDataID INTEGER PRIMARY KEY AUTOINCREMENT,
          UserID INTEGER NOT NULL,
          TrainName TEXT NOT NULL,
          Exec1 TEXT,
          Exec2 TEXT,
          Exec3 TEXT,
          Exec4 TEXT,
          Exec5 TEXT,
          Exec6 TEXT,
          Exec7 TEXT,
          Exec8 TEXT,
          Exec9 TEXT,
          Exec10 TEXT,
          FOREIGN KEY(UserID) REFERENCES UserData(UserID) ON DELETE CASCADE
        );
        
        CREATE TABLE IF NOT EXISTS TrainDay (
        Day INTEGER PRIMARY KEY,
        UserID INTEGER NOT NULL,
        TrainNumber INTEGER,
        FOREIGN KEY(UserID) REFERENCES UserData(UserID) ON DELETE CASCADE
        );  

        -- Insert only if no records exist in TrainDay
        INSERT INTO TrainDay (UserID, Day, TrainNumber)
        SELECT 1, 1, 0 WHERE NOT EXISTS (SELECT 1 FROM TrainDay WHERE UserID = 1 AND Day = 1);
        INSERT INTO TrainDay (UserID, Day, TrainNumber)
        SELECT 1, 2, 0 WHERE NOT EXISTS (SELECT 1 FROM TrainDay WHERE UserID = 1 AND Day = 2);
        INSERT INTO TrainDay (UserID, Day, TrainNumber)
        SELECT 1, 3, 0 WHERE NOT EXISTS (SELECT 1 FROM TrainDay WHERE UserID = 1 AND Day = 3);
        INSERT INTO TrainDay (UserID, Day, TrainNumber)
        SELECT 1, 4, 0 WHERE NOT EXISTS (SELECT 1 FROM TrainDay WHERE UserID = 1 AND Day = 4);
        INSERT INTO TrainDay (UserID, Day, TrainNumber)
        SELECT 1, 5, 0 WHERE NOT EXISTS (SELECT 1 FROM TrainDay WHERE UserID = 1 AND Day = 5);
        INSERT INTO TrainDay (UserID, Day, TrainNumber)
        SELECT 1, 6, 0 WHERE NOT EXISTS (SELECT 1 FROM TrainDay WHERE UserID = 1 AND Day = 6);
        INSERT INTO TrainDay (UserID, Day, TrainNumber)
        SELECT 1, 7, 0 WHERE NOT EXISTS (SELECT 1 FROM TrainDay WHERE UserID = 1 AND Day = 7);
      `);
  };

  try {
    await initDB();
    await db.runAsync('PRAGMA foreign_keys = ON');
    await db.runAsync('PRAGMA foreign_keys = ON')
      //loadUserDataToConsole(db)
  } catch (error) {
    alert("tietokantavirhe, käynnistä sovellus uudelleen")
  }
}


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

export const purgeDb = async (database: SQLite.SQLiteDatabase | null) => {
  if (!database) return;
  console.log("dbpurge")
  await database.runAsync('DELETE FROM UserData')
}

export const AddTrainingToDay = async (day: number, trainNumber: number, db: SQLite.SQLiteDatabase | null) => {
  if (!db) return;
  console.log("Add trainign : ", { day, trainNumber });
 
  const xs = await db.runAsync('UPDATE TrainDay set UserID=1, TrainNumber=? WHERE Day=? ', [trainNumber, day]);
};
export const loadDayData = async (setTrainForDays: React.Dispatch<React.SetStateAction<TrainDay[]>>, database: SQLite.SQLiteDatabase | null) => {

  if (!database) return
  const tableData = await database.getAllAsync<TrainDay>(`SELECT * FROM TrainDay ORDER BY Day DESC`);
  console.log("päviä " + tableData[0].Day, "trainnum " + tableData[0].TrainNumber)
  setTrainForDays(tableData)
};
export const deleteTraining = async (selectedTraining:number, database: SQLite.SQLiteDatabase | null) => {

  if (!database) return
  console.log("delete id: ",selectedTraining)
  await database.runAsync(`DELETE FROM TrainData WHERE TrainDataID =?`,selectedTraining);
};
export const deleteExercise = async (selectedExercise:number, database: SQLite.SQLiteDatabase | null) => {

  if (!database) return
  await database.runAsync(`DELETE FROM GymData WHERE GymDataID =?`,selectedExercise);
};


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

  console.log("loadgymdata:")
  if (!database) return
  const tableData = await database.getAllAsync<Exercise>(`SELECT * FROM GymData ORDER BY GymDataID DESC`);
  //console.log("tässä on " +tableData[0].Rest_Time_Minutes.toString())
  setgymExerList(tableData)
};

export const loadJogArr = async (
  database: SQLite.SQLiteDatabase | null,
  //setJogArr: React.Dispatch<React.SetStateAction<string | undefined>>, 
  setJogDataArr: React.Dispatch<React.SetStateAction<WeightAndJogdata[]>>, 
  //setFirstJogId: React.Dispatch<React.SetStateAction<jogId | undefined>>,
  ):Promise<string | undefined> => {

  
  if (!database) return ""
  //const JogObjall = await database.getAllAsync<string>(`SELECT * FROM JogData`);
  //const JogObj = await database.getAllAsync<jogCoordinates>(`SELECT Jog_Coordinates FROM JogData WHERE JogDataID =?`, [id]);  //SELECT Jog_Coordinates FROM JogData WHERE JogDataID =?` [id]
  
  //console.log("jogobj: ", JogObj[0].Jog_Coordinates)
  const JogDataArray = await database.getAllAsync<WeightAndJogdata>(`SELECT * FROM JogData ORDER BY JogDataID DESC LIMIT 10`);
  //console.log("jog distance arr: ", JogDataArray)

  //const firstJogID = await database.getFirstAsync<jogId>(`SELECT JogDataID FROM JogData ORDER By JogDataID`) //haetaan vanhin jogdata id
  //if(firstJogID?.JogDataID) {
    //setFirstJogId(firstJogID);
    //console.log("firstJogID: "+ firstJogID?.JogDataID)
  //}

  

  //setJogArr(JogObj[0].Jog_Coordinates)
  setJogDataArr(JogDataArray)
  //return JogObj[0].Jog_Coordinates
};

export const AddExercise = async (lepo: string, toisto: string, paino: string, Exec: string, sarja: string, db: SQLite.SQLiteDatabase | null) => {
  if (!db) return;
  console.log("INSERT ", { lepo, toisto, paino, Exec, sarja });
  const execData = await db.runAsync('INSERT INTO GymData (UserID, Rest_Time_Minutes, Repetitions, Weight_Kg, Exercise_Type, Set_Amount) VALUES (1,?,?,?,?,?)', [lepo, toisto, paino, Exec, sarja])
}
export const AddTraining = async (trainName: string, Exec1: string, Exec2: string, Exec3: string, Exec4: string, Exec5: string, Exec6: string, Exec7: string, Exec8: string, Exec9: string, Exec10: string, db: SQLite.SQLiteDatabase | null) => {
  if (!db) return;
  console.log("INSERT execs: ", { trainName, Exec1, Exec2, Exec3 });
  const trainData = await db.runAsync('INSERT INTO TrainData (UserID,TrainName, Exec1,Exec2,Exec3,Exec4,Exec5,Exec6,Exec7,Exec8,Exec9,Exec10) VALUES (1,?,?,?,?,?,?,?,?,?,?,?)', [trainName, Exec1, Exec2, Exec3, Exec4, Exec5, Exec6, Exec7, Exec8, Exec9, Exec10])
}
export const loadTrainData = async (setGymTrainList: React.Dispatch<React.SetStateAction<Training[]>>, database: SQLite.SQLiteDatabase | null) => {
    if (!database) return
  if (!database) return
  const tableDataTrain = await database.getAllAsync<Training>(`SELECT * FROM TrainData ORDER BY TrainDataID DESC`);
  //console.log("tässä on " +tableData[0].Rest_Time_Minutes.toString())
  setGymTrainList(tableDataTrain)
}