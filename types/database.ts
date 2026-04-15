import * as SQLite from 'expo-sqlite';

export type DbProps =
  {
    db: SQLite.SQLiteDatabase | null
    setDb: (React.Dispatch<React.SetStateAction<SQLite.SQLiteDatabase | null>>)
    setUserData: (React.Dispatch<React.SetStateAction<UserData[]>>)
    setUserWeight: (React.Dispatch<React.SetStateAction<UserWeight[]>>)
  }

export type UserData =
  {
    FirstName: string
    LastName: string
    Height_Cm: number
    Age: number
    UserID: number
  }
export type UserWeight =
  {
    Weight_Kg: number
    Date: string
    UserID: number
  }
export type Exercise =
  {
    [x: string]: any;
    Rest_Time_Minutes: number
    Repetitions: number
    Weight_Kg: number
    Exercise_Type: string
    Set_Amount: number
    UserID: number
  }
export type Training =
  {
    [x: string]: any;
    TrainName: string
    Exer1: string
    Exer2: string
    Exer3: string
    Exer4: string
    Exer5: string
    Exer6: string
    Exer7: string
    Exer8: string
    Exer9: string
    Exer10: string
  }
export type TrainDay=
{
  TrainNumber: number
  Day: number
}
